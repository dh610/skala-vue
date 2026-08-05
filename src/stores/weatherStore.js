import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { countries, findCountryOfCity } from '../data/countries.js'

const OPENWEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'

/** 도시 정의를 폴백(목데이터) 상태의 표시용 레코드로 변환한다. */
function toMockRecord(city) {
  return { ...city, ...city.mock, observedAt: null, live: false }
}

/**
 * 홈 대시보드와 상세 페이지가 함께 바라보는 날씨 스토어 (국가별).
 * - 국가 코드별로 도시 레코드를 보관하고, 선택한 국가만 온디맨드로 실시간 조회
 * - OpenWeather 관측값을 Promise.all로 병렬 호출, 실패 시 목데이터로 폴백
 * - 한 번 성공한 국가는 캐시하여 재요청하지 않는다 (force로 강제 갱신)
 */
export const useWeatherStore = defineStore('weather', () => {
  // { [countryCode]: City[] } — 초기값은 전부 목데이터
  const byCountry = reactive({})
  countries.forEach((country) => {
    byCountry[country.code] = country.cities.map(toMockRecord)
  })

  const loaded = reactive({}) // code -> boolean
  const loadingCode = ref('')
  const errorMessage = ref('')

  function records(code) {
    return byCountry[code] ?? []
  }

  function isLive(code) {
    return (byCountry[code] ?? []).some((record) => record.live)
  }

  async function loadCountry(code, { force = false } = {}) {
    if (loaded[code] && !force) return

    const country = countries.find((item) => item.code === code)
    if (!country) return

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

    if (!apiKey) {
      byCountry[code] = country.cities.map(toMockRecord)
      errorMessage.value = '.env에 VITE_OPENWEATHER_API_KEY가 없어 목데이터로 표시합니다.'
      loaded[code] = true
      return
    }

    loadingCode.value = code
    errorMessage.value = ''

    try {
      const responses = await Promise.all(
        country.cities.map((city) =>
          axios.get(OPENWEATHER_URL, {
            params: {
              lat: city.lat,
              lon: city.lon,
              appid: apiKey,
              units: 'metric',
              lang: 'kr',
            },
          }),
        ),
      )

      byCountry[code] = country.cities.map((city, index) => {
        const data = responses[index].data
        return {
          ...city,
          temperature: Math.round(data.main.temp),
          condition: data.weather?.[0]?.description ?? city.mock.condition,
          humidity: data.main.humidity,
          wind: data.wind?.speed ?? city.mock.wind,
          observedAt: data.dt ? new Date(data.dt * 1000) : null,
          live: true,
        }
      })
      loaded[code] = true
    } catch (error) {
      console.error('날씨 데이터 요청 실패:', error)
      byCountry[code] = country.cities.map(toMockRecord)
      errorMessage.value =
        axios.isAxiosError(error) && error.response?.status === 401
          ? 'API 키가 거부되어 목데이터로 표시합니다. 발급 상태를 확인해 주세요.'
          : '실시간 데이터를 가져오지 못해 목데이터로 표시합니다.'
      loaded[code] = true
    } finally {
      loadingCode.value = ''
    }
  }

  /** 도시 id로 레코드를 찾는다 (상세 페이지용). */
  function findCity(cityId) {
    for (const code of Object.keys(byCountry)) {
      const found = byCountry[code].find((city) => city.id === cityId)
      if (found) return found
    }
    return undefined
  }

  /** 도시 id가 속한 국가 코드. */
  function countryCodeOfCity(cityId) {
    return findCountryOfCity(cityId)?.code
  }

  return {
    byCountry,
    loadingCode,
    errorMessage,
    records,
    isLive,
    loadCountry,
    findCity,
    countryCodeOfCity,
  }
})
