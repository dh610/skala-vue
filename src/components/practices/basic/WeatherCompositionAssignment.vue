<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

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

function selectCity(weather) {
  selectedCityInfo.value = weather
}

function showDetails(weather) {
  window.alert(`${weather.name}: ${weather.temperature}°C, ${weather.condition}`)
}
</script>

<template>
  <main class="weather-page">
    <header class="page-header">
      <p class="eyebrow">Composition API Assignment</p>
      <h1>과제 2: 날씨</h1>
    </header>

    <section class="search-section" aria-labelledby="search-heading">
      <h2 id="search-heading">도시 검색</h2>
      <label for="city-search">도시명</label>
      <input
        id="city-search"
        v-model="searchQuery"
        type="search"
        placeholder="서울, 수원, 부산..."
      />
      <p class="search-summary">
        검색 중인 도시: <strong>{{ searchQuery.trim() || '전체 도시' }}</strong>
      </p>
    </section>

    <section class="weather-section" aria-labelledby="weather-heading">
      <div class="section-heading">
        <h2 id="weather-heading">지역별 날씨 현황</h2>
        <span>{{ filteredWeatherList.length }}개 도시</span>
      </div>

      <p v-if="filteredWeatherList.length === 0" class="empty-state">
        검색 결과와 일치하는 도시가 없습니다.
      </p>

      <div v-else class="weather-grid">
        <article
          v-for="weather in filteredWeatherList"
          :key="weather.id"
          class="weather-card"
          :class="{ selected: selectedCityInfo?.id === weather.id }"
          @click="selectCity(weather)"
        >
          <div>
            <p class="city-name">{{ weather.name }}</p>
            <p class="condition">{{ weather.condition }}</p>
          </div>
          <p class="temperature">{{ weather.temperature }}<span>°C</span></p>
          <button type="button" @click.stop="showDetails(weather)">상세보기</button>
        </article>
      </div>
    </section>

    <p class="selection-status" aria-live="polite">
      <template v-if="selectedCityInfo">
        {{ selectedCityInfo.name }} 선택됨: {{ selectedCityInfo.temperature }}°C,
        {{ selectedCityInfo.condition }}
      </template>
      <template v-else>선택한 도시가 없습니다.</template>
    </p>
  </main>
</template>

<style scoped>
.weather-page {
  display: grid;
  gap: 16px;
  width: min(100%, 860px);
  margin: 0 auto;
  color: #202830;
}

.page-header {
  padding: 4px 0;
}

.eyebrow {
  margin: 0 0 4px;
  color: #52616f;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
}

h1,
h2,
p {
  letter-spacing: 0;
}

h1 {
  margin: 0;
  font-size: 28px;
}

h2 {
  margin: 0;
  font-size: 18px;
}

.search-section,
.weather-section {
  padding: 18px;
  border: 1px solid #d7dce2;
  border-radius: 8px;
  background: #ffffff;
}

.search-section label {
  display: block;
  margin: 14px 0 5px;
  font-size: 14px;
  font-weight: 600;
}

input {
  width: 100%;
  min-height: 42px;
  padding: 8px 10px;
  border: 1px solid #929da8;
  border-radius: 4px;
  background: #ffffff;
  color: #202830;
  font-size: 16px;
}

.search-summary {
  margin: 8px 0 0;
  color: #52616f;
  font-size: 14px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.section-heading span {
  color: #52616f;
  font-size: 13px;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
}

.weather-card {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
  min-height: 136px;
  padding: 14px;
  border: 1px solid #cfd6dd;
  border-radius: 6px;
  background: #f8fafb;
  cursor: pointer;
}

.weather-card.selected {
  border-color: #168a65;
  box-shadow: inset 0 0 0 1px #168a65;
}

.city-name,
.condition,
.temperature {
  margin: 0;
}

.city-name {
  font-size: 18px;
  font-weight: 700;
}

.condition {
  margin-top: 3px;
  color: #52616f;
}

.temperature {
  font-size: 28px;
  font-weight: 700;
}

.temperature span {
  font-size: 15px;
  font-weight: 600;
}

button {
  grid-column: 1 / -1;
  min-height: 34px;
  padding: 6px 10px;
  border: 1px solid #929da8;
  border-radius: 4px;
  background: #ffffff;
  color: #202830;
  cursor: pointer;
}

button:hover {
  background: #eaf0f3;
}

.empty-state {
  margin: 0;
  padding: 24px 12px;
  border: 1px dashed #929da8;
  border-radius: 6px;
  color: #52616f;
  text-align: center;
}

.selection-status {
  margin: 0;
  padding: 12px 14px;
  border: 1px solid #a8d8c7;
  border-radius: 6px;
  background: #effaf6;
  color: #19664e;
  text-align: center;
}

@media (max-width: 520px) {
  .search-section,
  .weather-section {
    padding: 14px;
  }

  .weather-grid {
    grid-template-columns: 1fr;
  }
}
</style>
