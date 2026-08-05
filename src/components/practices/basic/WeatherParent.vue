<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

const searchQuery = ref('')
const selectedCityInfo = ref(null)
const weatherList = ref([
  { id: 'city-01', name: '서울', temperature: 28, condition: '맑음' },
  { id: 'city-02', name: '수원', temperature: 24, condition: '비' },
  { id: 'city-03', name: '부산', temperature: 26, condition: '구름' },
  { id: 'city-04', name: '대구', temperature: 22, condition: '흐림' },
  { id: 'city-05', name: '제주', temperature: 30, condition: '맑음' },
])

const filteredWeatherList = computed(() => {
  const keyword = searchQuery.value.trim()

  if (!keyword) {
    return weatherList.value
  }

  return weatherList.value.filter((weather) => weather.name.includes(keyword))
})

watch(selectedCityInfo, (newCity, oldCity) => {
  const previousName = oldCity?.name ?? '선택 없음'
  const currentName = newCity?.name ?? '선택 없음'

  console.log(`[watch 감지] 선택 도시 변경: ${previousName} -> ${currentName}`)
})

watchEffect(() => {
  const matchedCities = filteredWeatherList.value.map((weather) => weather.name).join(', ')
  const result = matchedCities || '일치하는 도시 없음'

  console.log(`[watchEffect 자동 호출] 검색어 "${searchQuery.value}"의 필터 결과: ${result}`)
})

function updateSearchQuery(nextQuery) {
  searchQuery.value = nextQuery
}

function selectCity(weather) {
  selectedCityInfo.value = weather
}

function showDetails(weather) {
  window.alert(`${weather.name}: ${weather.temperature}°C, ${weather.condition}`)
}
</script>

<template>
  <main class="weather-page">
    <BaseDashboardCard title="도시 검색">
      <SearchBar :search-query="searchQuery" @update-query="updateSearchQuery" />
    </BaseDashboardCard>

    <BaseDashboardCard title="지역별 날씨 현황">
      <p v-if="filteredWeatherList.length === 0" class="empty-state">
        검색 결과와 일치하는 도시가 없습니다.
      </p>

      <div v-else class="weather-list">
        <WeatherCard
          v-for="weather in filteredWeatherList"
          :key="weather.id"
          :weather="weather"
          :selected="selectedCityInfo?.id === weather.id"
          @select-card="selectCity"
          @click-detail="showDetails"
        />
      </div>
    </BaseDashboardCard>

    <p class="selection-status" aria-live="polite">
      <template v-if="selectedCityInfo">
        {{ selectedCityInfo.name }} 선택됨: {{ selectedCityInfo.temperature }}°C,
        {{ selectedCityInfo.condition }}
      </template>
      <template v-else>카드를 클릭하거나 검색해 보세요.</template>
    </p>
  </main>
</template>

<style scoped>
header p {
  margin: 0 0 4px;
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: 28px;
}

.weather-list {
  display: grid;
  gap: 10px;
}

.selection-status {
  margin: 0;
  padding: 12px 14px;
  border: 1px solid var(--accent);
  border-radius: var(--r-sm);
  background: var(--accent-bg);
  color: var(--accent-dark);
  text-align: center;
}
</style>
