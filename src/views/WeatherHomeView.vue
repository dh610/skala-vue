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
    <BaseDashboardCard title="🔍 도시 검색 (한글 즉시 동기화)">
      <SearchBar v-model="searchQuery" />
      <p class="search-status">검색 중인 도시: {{ searchQuery }}</p>
    </BaseDashboardCard>

    <BaseDashboardCard title="🌆 지역별 날씨 현황">
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

    <p class="guide-message">카드를 클릭하거나 검색해 보세요.</p>
  </main>
</template>

<style scoped>
.weather-page {
  display: grid;
  gap: 16px;
}

.weather-list {
  display: grid;
  gap: 10px;
}

.search-status {
  margin: 8px 0 0;
  color: #52616f;
  font-size: 14px;
}

.guide-message {
  margin: 0;
  padding: 12px;
  background: #eaf7e9;
  color: #267142;
  text-align: center;
}

.empty-state {
  margin: 0;
  padding: 24px 12px;
  color: #52616f;
  text-align: center;
}
</style>
