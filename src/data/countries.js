/**
 * 국가별 도시 목록.
 *
 * - lat / lon: OpenWeather 관측값 조회용 위경도
 * - tz: 현지 시각 표시용 IANA 타임존
 * - mock: API 키가 없거나 통신 실패 시 사용하는 폴백 (섭씨 원본)
 *
 * 각 국가의 cities[0] 이 대표 도시(히어로에 노출)다.
 * 라우팅(`/weather/:cityId`)이 id에 의존하므로 한국 도시의 기존 id(city-01..)는 유지한다.
 */
export const countries = [
  {
    code: 'KR',
    nameKo: '한국',
    nameEn: 'South Korea',
    cities: [
      {
        id: 'city-01',
        name: '서울',
        lat: 37.5665,
        lon: 126.978,
        tz: 'Asia/Seoul',
        mock: { temperature: 28, condition: '맑음', humidity: 58, wind: 2.4 },
      },
      {
        id: 'city-02',
        name: '수원',
        lat: 37.2636,
        lon: 127.0286,
        tz: 'Asia/Seoul',
        mock: { temperature: 24, condition: '비', humidity: 82, wind: 3.1 },
      },
      {
        id: 'city-03',
        name: '부산',
        lat: 35.1796,
        lon: 129.0756,
        tz: 'Asia/Seoul',
        mock: { temperature: 26, condition: '구름', humidity: 71, wind: 4.2 },
      },
      {
        id: 'city-04',
        name: '대구',
        lat: 35.8714,
        lon: 128.6014,
        tz: 'Asia/Seoul',
        mock: { temperature: 22, condition: '흐림', humidity: 65, wind: 1.8 },
      },
      {
        id: 'city-05',
        name: '제주',
        lat: 33.4996,
        lon: 126.5312,
        tz: 'Asia/Seoul',
        mock: { temperature: 30, condition: '맑음', humidity: 68, wind: 5.3 },
      },
    ],
  },
  {
    code: 'JP',
    nameKo: '일본',
    nameEn: 'Japan',
    cities: [
      {
        id: 'jp-tokyo',
        name: '도쿄',
        lat: 35.6762,
        lon: 139.6503,
        tz: 'Asia/Tokyo',
        mock: { temperature: 31, condition: '맑음', humidity: 64, wind: 3.0 },
      },
      {
        id: 'jp-osaka',
        name: '오사카',
        lat: 34.6937,
        lon: 135.5023,
        tz: 'Asia/Tokyo',
        mock: { temperature: 32, condition: '구름 조금', humidity: 60, wind: 2.6 },
      },
      {
        id: 'jp-sapporo',
        name: '삿포로',
        lat: 43.0618,
        lon: 141.3545,
        tz: 'Asia/Tokyo',
        mock: { temperature: 24, condition: '흐림', humidity: 70, wind: 3.8 },
      },
      {
        id: 'jp-fukuoka',
        name: '후쿠오카',
        lat: 33.5904,
        lon: 130.4017,
        tz: 'Asia/Tokyo',
        mock: { temperature: 30, condition: '맑음', humidity: 66, wind: 3.4 },
      },
    ],
  },
  {
    code: 'US',
    nameKo: '미국',
    nameEn: 'United States',
    cities: [
      {
        id: 'us-newyork',
        name: '뉴욕',
        lat: 40.7128,
        lon: -74.006,
        tz: 'America/New_York',
        mock: { temperature: 25, condition: '맑음', humidity: 55, wind: 4.1 },
      },
      {
        id: 'us-losangeles',
        name: '로스앤젤레스',
        lat: 34.0522,
        lon: -118.2437,
        tz: 'America/Los_Angeles',
        mock: { temperature: 27, condition: '맑음', humidity: 48, wind: 3.2 },
      },
      {
        id: 'us-chicago',
        name: '시카고',
        lat: 41.8781,
        lon: -87.6298,
        tz: 'America/Chicago',
        mock: { temperature: 22, condition: '구름', humidity: 58, wind: 5.0 },
      },
      {
        id: 'us-sanfrancisco',
        name: '샌프란시스코',
        lat: 37.7749,
        lon: -122.4194,
        tz: 'America/Los_Angeles',
        mock: { temperature: 19, condition: '안개', humidity: 72, wind: 5.4 },
      },
      {
        id: 'us-houston',
        name: '휴스턴',
        lat: 29.7604,
        lon: -95.3698,
        tz: 'America/Chicago',
        mock: { temperature: 31, condition: '맑음', humidity: 66, wind: 3.5 },
      },
      {
        id: 'us-miami',
        name: '마이애미',
        lat: 25.7617,
        lon: -80.1918,
        tz: 'America/New_York',
        mock: { temperature: 30, condition: '소나기', humidity: 78, wind: 4.2 },
      },
      {
        id: 'us-lasvegas',
        name: '라스베이거스',
        lat: 36.1699,
        lon: -115.1398,
        tz: 'America/Los_Angeles',
        mock: { temperature: 36, condition: '맑음', humidity: 22, wind: 3.0 },
      },
      {
        id: 'us-austin',
        name: '오스틴',
        lat: 30.2672,
        lon: -97.7431,
        tz: 'America/Chicago',
        mock: { temperature: 33, condition: '맑음', humidity: 50, wind: 3.8 },
      },
      {
        id: 'us-seattle',
        name: '시애틀',
        lat: 47.6062,
        lon: -122.3321,
        tz: 'America/Los_Angeles',
        mock: { temperature: 21, condition: '흐림', humidity: 68, wind: 3.3 },
      },
      {
        id: 'us-boston',
        name: '보스턴',
        lat: 42.3601,
        lon: -71.0589,
        tz: 'America/New_York',
        mock: { temperature: 24, condition: '구름', humidity: 60, wind: 4.5 },
      },
      {
        id: 'us-washington',
        name: '워싱턴 D.C.',
        lat: 38.9072,
        lon: -77.0369,
        tz: 'America/New_York',
        mock: { temperature: 27, condition: '맑음', humidity: 57, wind: 3.1 },
      },
    ],
  },
  {
    code: 'DE',
    nameKo: '독일',
    nameEn: 'Germany',
    cities: [
      {
        id: 'de-berlin',
        name: '베를린',
        lat: 52.52,
        lon: 13.405,
        tz: 'Europe/Berlin',
        mock: { temperature: 21, condition: '구름', humidity: 62, wind: 3.6 },
      },
      {
        id: 'de-munich',
        name: '뮌헨',
        lat: 48.1351,
        lon: 11.582,
        tz: 'Europe/Berlin',
        mock: { temperature: 20, condition: '비', humidity: 72, wind: 3.0 },
      },
      {
        id: 'de-hamburg',
        name: '함부르크',
        lat: 53.5511,
        lon: 9.9937,
        tz: 'Europe/Berlin',
        mock: { temperature: 19, condition: '흐림', humidity: 74, wind: 4.4 },
      },
    ],
  },
  {
    code: 'CN',
    nameKo: '중국',
    nameEn: 'China',
    cities: [
      {
        id: 'cn-beijing',
        name: '베이징',
        lat: 39.9042,
        lon: 116.4074,
        tz: 'Asia/Shanghai',
        mock: { temperature: 33, condition: '맑음', humidity: 45, wind: 2.8 },
      },
      {
        id: 'cn-shanghai',
        name: '상하이',
        lat: 31.2304,
        lon: 121.4737,
        tz: 'Asia/Shanghai',
        mock: { temperature: 34, condition: '구름 조금', humidity: 68, wind: 3.3 },
      },
      {
        id: 'cn-guangzhou',
        name: '광저우',
        lat: 23.1291,
        lon: 113.2644,
        tz: 'Asia/Shanghai',
        mock: { temperature: 33, condition: '흐림', humidity: 76, wind: 2.5 },
      },
    ],
  },
  {
    code: 'GB',
    nameKo: '영국',
    nameEn: 'United Kingdom',
    cities: [
      {
        id: 'gb-london',
        name: '런던',
        lat: 51.5074,
        lon: -0.1278,
        tz: 'Europe/London',
        mock: { temperature: 18, condition: '구름', humidity: 70, wind: 4.0 },
      },
      {
        id: 'gb-manchester',
        name: '맨체스터',
        lat: 53.4808,
        lon: -2.2426,
        tz: 'Europe/London',
        mock: { temperature: 17, condition: '비', humidity: 78, wind: 4.6 },
      },
      {
        id: 'gb-edinburgh',
        name: '에든버러',
        lat: 55.9533,
        lon: -3.1883,
        tz: 'Europe/London',
        mock: { temperature: 15, condition: '흐림', humidity: 80, wind: 5.2 },
      },
    ],
  },
]

export const defaultCountryCode = countries[0].code

export function findCountryOfCity(cityId) {
  return countries.find((country) => country.cities.some((city) => city.id === cityId))
}
