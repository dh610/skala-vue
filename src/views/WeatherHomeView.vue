<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore.js'
import { useWeatherStore } from '../stores/weatherStore.js'
import { useWeatherSearch } from '../composables/useWeatherSearch.js'
import { countries, defaultCountryCode } from '../data/countries.js'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'

const router = useRouter()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()

const activeCode = ref(defaultCountryCode)
const selectedCityInfo = ref(null)

// 전역 도시 검색 로직은 Composable로 추출해 재사용 가능하게 분리했다.
const { searchQuery, isSearching, searchResults } = useWeatherSearch(
  computed(() => weatherStore.allRecords),
  (codes) => codes.forEach((code) => weatherStore.loadCountry(code)),
)

onMounted(() => {
  weatherStore.loadCountry(activeCode.value)
})

// 국가를 바꾸면 그 나라 도시를 불러오고, 선택/검색 상태는 초기화한다.
watch(activeCode, (code) => {
  weatherStore.loadCountry(code)
  selectedCityInfo.value = null
  searchQuery.value = ''
})

const activeCountry = computed(() => countries.find((c) => c.code === activeCode.value))
const cityRecords = computed(() => weatherStore.records(activeCode.value))
const isLive = computed(() => weatherStore.isLive(activeCode.value))
const isLoading = computed(() => weatherStore.loadingCode === activeCode.value)

// 화면에 뿌릴 목록: 검색 중이면 전역 결과, 아니면 선택 국가의 도시
const displayList = computed(() => (isSearching.value ? searchResults.value : cityRecords.value))

// 히어로에 세우는 도시: 선택 도시 > (검색 중이면 첫 매치) > 선택 국가 대표 도시.
// 전역 레코드에서 다시 조회해 실시간/단위 변경에 계속 반응하도록 한다.
const featureCity = computed(() => {
  if (selectedCityInfo.value) {
    return (
      weatherStore.allRecords.find((city) => city.id === selectedCityInfo.value.id) ??
      selectedCityInfo.value
    )
  }
  if (isSearching.value) return searchResults.value[0]
  return cityRecords.value[0]
})
const featureTemp = computed(() => {
  const celsius = featureCity.value?.temperature
  if (celsius === undefined) return ''
  return configStore.unit === 'fahrenheit' ? Math.round((celsius * 9) / 5 + 32) : celsius
})

// 대표 도시의 현지 시각
const localTime = computed(() => {
  const tz = featureCity.value?.tz
  if (!tz) return ''
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())
})

// 마지막 글자에 받침이 있으면 '이', 없으면 '가' (한글 유니코드 기준)
function subjectParticle(word) {
  const last = word.charCodeAt(word.length - 1)
  if (last < 0xac00 || last > 0xd7a3) return '가' // 한글이 아니면 기본 '가'
  return (last - 0xac00) % 28 !== 0 ? '이' : '가'
}

const statusMessage = computed(() => {
  const city = selectedCityInfo.value
  if (!city) return '카드를 선택하거나 도시를 검색해 보세요.'
  return `${city.name}${subjectParticle(city.name)} 선택되었습니다.`
})

// immediate: true → 최초 마운트 시점에도 콜백이 한 번 실행돼 로그가 찍힌다.
watch(
  selectedCityInfo,
  (newCity, oldCity) => {
    const previousName = oldCity?.name ?? '선택 없음'
    const currentName = newCity?.name ?? '선택 없음'
    console.log(`[watch 감지] 선택 도시 변경: ${previousName} -> ${currentName}`)
  },
  { immediate: true },
)

watchEffect(() => {
  console.log(`[watchEffect 자동 호출] 현재 검색어: "${searchQuery.value}"`)
})

function selectCity(weather) {
  selectedCityInfo.value = weather
}

function showDetails(weather) {
  router.push(`/weather/${weather.id}`)
}

function refresh() {
  weatherStore.loadCountry(activeCode.value, { force: true })
}
</script>

<template>
  <main class="weather-page">
    <!-- 히어로: 대표 도시 실시간 온도 + 현지 시각 (참조의 지구본 대신) -->
    <section class="hero">
      <div class="hero__lead">
        <p class="eyebrow">
          <span class="live-dot" :class="{ 'is-live': isLive }" aria-hidden="true"></span>
          {{ isLive ? 'OpenWeather 실시간 관측' : '목데이터' }}
        </p>
        <h1>세계 날씨</h1>
        <p class="hero__desc">
          도시를 검색하거나 국가를 선택해 대표 도시들의 실시간 기상관측값을 확인하고, 카드를 눌러
          상세 정보를 봅니다.
        </p>
        <button type="button" class="refresh" :disabled="isLoading" @click="refresh">
          {{ isLoading ? '불러오는 중…' : '새로고침' }}
        </button>
      </div>

      <div v-if="featureCity" class="hero__feature">
        <span class="hero__city">
          {{ featureCity.countryEn }} · {{ featureCity.name }}
          <em v-if="localTime">현지 {{ localTime }}</em>
        </span>
        <span class="hero__temp"
          >{{ featureTemp }}<em>{{ configStore.unitSymbol }}</em></span
        >
        <span class="hero__cond">{{ featureCity.condition }}</span>
      </div>
    </section>

    <!-- 도시 검색: 국가보다 상위 레이어. 전체 국가에서 검색한다. -->
    <BaseDashboardCard title="도시 검색">
      <SearchBar v-model="searchQuery" />
      <p class="search-status">
        <template v-if="isSearching">
          전체 국가에서 <strong>{{ searchQuery.trim() }}</strong> 검색 중 ·
          {{ searchResults.length }}곳
        </template>
        <template v-else>도시 이름을 입력하면 국가와 상관없이 검색됩니다.</template>
      </p>
    </BaseDashboardCard>

    <!-- 국가 탭 스위처 (검색 중에는 전역 결과로 대체) -->
    <nav v-if="!isSearching" class="country-tabs" aria-label="국가 선택">
      <button
        v-for="country in countries"
        :key="country.code"
        type="button"
        class="country-tab"
        :class="{ 'is-active': country.code === activeCode }"
        :aria-pressed="country.code === activeCode"
        @click="activeCode = country.code"
      >
        <span class="country-tab__ko">{{ country.nameKo }}</span>
        <span class="country-tab__en">{{ country.code }}</span>
      </button>
    </nav>

    <ElAlert
      v-if="weatherStore.errorMessage"
      :title="weatherStore.errorMessage"
      type="info"
      :closable="false"
      show-icon
    />

    <BaseDashboardCard :title="isSearching ? '검색 결과' : `${activeCountry.nameKo} 날씨 현황`">
      <template #meta>
        <span class="count-badge">{{ displayList.length }}곳</span>
      </template>

      <ElSkeleton v-if="!isSearching && isLoading && !isLive" :rows="4" animated />

      <ElEmpty
        v-else-if="displayList.length === 0"
        :description="
          isSearching ? '검색어와 일치하는 도시가 없습니다.' : '표시할 도시가 없습니다.'
        "
      />

      <div v-else class="weather-list">
        <WeatherCard
          v-for="weather in displayList"
          :key="weather.id"
          :weather="weather"
          :selected="selectedCityInfo?.id === weather.id"
          :region="isSearching ? weather.countryKo : ''"
          @select-card="selectCity"
          @click-detail="showDetails"
        >
          <!-- action Scoped Slot: 부모가 상세보기 버튼 영역을 직접 구성 -->
          <template #action="{ weather: city, open }">
            <button type="button" class="card-detail" @click.stop="open">
              {{ city.name }} 상세 보기 →
            </button>
          </template>
        </WeatherCard>
      </div>

      <!-- BaseDashboardCard footer Named Slot 활용 -->
      <template #footer>
        {{ isLive ? 'OpenWeather 실시간 관측값' : '목데이터' }} · 카드를 클릭해 히어로에 올리거나
        상세를 열 수 있습니다.
      </template>
    </BaseDashboardCard>

    <p class="status-strip">{{ statusMessage }}</p>

    <!-- /weather/:cityId 진입 시 상세 모달이 여기서 렌더된다 (홈은 뒤에 유지) -->
    <RouterView />
  </main>
</template>

<style scoped>
/* ---------- 히어로 ---------- */
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: var(--s4);
  padding-bottom: var(--s3);
  border-bottom: 1px solid var(--line-strong);
}

.hero__lead {
  display: grid;
  gap: 10px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--muted);
}

.live-dot.is-live {
  background: var(--accent);
}

.hero__lead h1 {
  margin: 0;
  font-size: clamp(38px, 6vw, 60px);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1;
}

.hero__desc {
  max-width: 46ch;
  margin: 0;
  color: var(--ink-soft);
}

.refresh {
  justify-self: start;
  margin-top: 4px;
}

/* 대표 도시 온도 — serif 디스플레이 */
.hero__feature {
  display: grid;
  justify-items: end;
  gap: 2px;
  text-align: right;
}

.hero__city {
  color: var(--ink-soft);
  font-size: 14px;
  font-weight: 700;
}

.hero__city em {
  margin-left: 6px;
  color: var(--muted);
  font-style: normal;
  font-weight: 600;
}

.hero__temp {
  font-family: var(--font-serif);
  font-size: clamp(72px, 12vw, 128px);
  font-weight: 600;
  line-height: 0.9;
  letter-spacing: -0.03em;
}

.hero__temp em {
  font-style: normal;
  font-size: 0.32em;
  color: var(--muted);
}

.hero__cond {
  color: var(--muted);
  font-size: 14px;
}

/* ---------- 국가 탭 ---------- */
.country-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  border-bottom: 1px solid var(--line);
}

.country-tab {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
  min-height: 0;
  padding: 10px 14px;
  margin-bottom: -1px;
  border: 0;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  background: transparent;
  color: var(--ink-soft);
  font-weight: 700;
  cursor: pointer;
  transition: color 0.15s;
}

.country-tab:hover {
  background: transparent;
  color: var(--ink);
}

.country-tab.is-active {
  color: var(--ink);
  border-bottom-color: var(--accent);
}

.country-tab__ko {
  font-size: 15px;
}

.country-tab__en {
  color: var(--muted);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.country-tab.is-active .country-tab__en {
  color: var(--accent-dark);
}

/* ---------- 목록 ---------- */
.weather-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--s2);
}

.card-detail {
  width: 100%;
}

.search-status {
  margin: 12px 0 0;
  color: var(--ink-soft);
  font-size: 14px;
}

.search-status strong {
  color: var(--accent-dark);
}

.count-badge {
  padding: 2px 10px;
  border: 1px solid var(--line);
  border-radius: var(--pill);
  color: var(--muted);
  font-size: 12px;
  font-weight: 700;
}

@media (max-width: 640px) {
  .hero {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .hero__feature {
    justify-items: start;
    text-align: left;
  }
}
</style>
