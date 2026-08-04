<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'

const router = useRouter()
const searchQuery = ref('')
const weatherList = [
  { id: 'city-01', name: '서울', temperature: 28, condition: '맑음' },
  { id: 'city-02', name: '수원', temperature: 24, condition: '비' },
  { id: 'city-03', name: '부산', temperature: 26, condition: '구름' },
  { id: 'city-04', name: '대구', temperature: 22, condition: '흐림' },
  { id: 'city-05', name: '제주', temperature: 30, condition: '맑음' },
]

const filteredWeatherList = computed(() => {
  const keyword = searchQuery.value.trim()
  return keyword ? weatherList.filter((weather) => weather.name.includes(keyword)) : weatherList
})

function showDetails(cityId) {
  router.push(`/weather/${cityId}`)
}
</script>

<template>
  <main class="weather-page">
    <header>
      <p>Vue Router Assignment</p>
      <h1>지역별 날씨</h1>
    </header>

    <BaseDashboardCard title="도시 검색">
      <SearchBar v-model="searchQuery" />
    </BaseDashboardCard>

    <BaseDashboardCard title="날씨 현황">
      <p v-if="filteredWeatherList.length === 0" class="empty-state">
        검색 결과와 일치하는 도시가 없습니다.
      </p>
      <div v-else class="weather-list">
        <WeatherCard
          v-for="weather in filteredWeatherList"
          :key="weather.id"
          :weather="weather"
          @show-detail="showDetails"
        />
      </div>
    </BaseDashboardCard>
  </main>
</template>

<style scoped>
.weather-page {
  display: grid;
  gap: 16px;
}

header p {
  margin: 0 0 4px;
  color: #52616f;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
}

.weather-list {
  display: grid;
  gap: 10px;
}

.empty-state {
  margin: 0;
  padding: 24px 12px;
  color: #52616f;
  text-align: center;
}
</style>
