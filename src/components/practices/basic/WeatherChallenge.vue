<script setup>
import { computed, ref } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '대구', temp: 22, status: '흐림' },
  { id: 'city_05', name: '제주', temp: 30, status: '맑음' },
])

const searchCity = ref('')
const statusMessage = ref('선택한 도시가 없습니다.')

const filteredWeather = computed(() => {
  if (!searchCity.value) {
    return weatherList.value
  }

  const keyword = searchCity.value.trim()

  return weatherList.value.filter((city) => city.name.includes(keyword))
})

const lazyInput = ref('')
const ageInput = ref(0)
const emailInput = ref('')
const priceInput = ref('')

function updateSearch(event) {
  searchCity.value = event.target.value
}

function selectCity(cityName) {
  statusMessage.value = `${cityName}이 선택되었습니다.`
}

function showDetail(cityName, status) {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <main class="challenge-page">
    <section class="practice-section">
      <h2>Vue Form Handling</h2>

      <h3>1) v-model 양방향 바인딩</h3>
      <input v-model="searchCity" type="text" placeholder="날씨를 보고 싶은 도시명을 입력하세요" />
      <p>입력 값(실시간 반영): {{ searchCity }}</p>

      <h3>2) :value + @input 바인딩 (한글 입력 + 수동 반영)</h3>
      <input
        type="text"
        :value="searchCity"
        @input="updateSearch"
        placeholder="위와 같은 값 공유: 이벤트로 값 반영"
      />

      <p class="status-bar">{{ statusMessage }}</p>
    </section>

    <section class="practice-section">
      <h2>v-model Modifiers</h2>

      <div>
        <h3>1) .lazy</h3>
        <input v-model.lazy="lazyInput" placeholder="Enter 또는 포커스 해제 시 반영" />
        <p>확정값: {{ lazyInput }}</p>
      </div>

      <div>
        <h3>2) .number</h3>
        <input v-model.number="ageInput" type="number" placeholder="나이 입력" />
        <p>
          입력값 타입: <strong>{{ typeof ageInput }}</strong> / 값: <strong>{{ ageInput }}</strong>
        </p>
      </div>

      <div>
        <h3>3) .trim</h3>
        <input v-model.trim="emailInput" placeholder="이메일 입력(앞뒤 공백 제거)" />
        <p>공백 제거값: "{{ emailInput }}"</p>
      </div>

      <div>
        <h3>4) 체이닝</h3>
        <input v-model.trim.number="priceInput" placeholder="공백+숫자 조합" />
        <p>처리값: "{{ priceInput }}"</p>
      </div>
    </section>

    <section class="practice-section">
      <h2>날씨 Mockup (v-for, v-if, 이벤트)</h2>
      <div v-if="filteredWeather.length === 0" class="empty-state">해당 도시가 없습니다.</div>
      <div
        v-for="city in filteredWeather"
        :key="city.id"
        class="weather-card"
        @click="selectCity(city.name)"
      >
        <h3>{{ city.name }}</h3>
        <p>기온: {{ city.temp }}°C</p>
        <p v-if="city.temp >= 25">🔥 더움 (25도 이상)</p>
        <p v-else>❄️ 선선함 (25도 미만)</p>
        <p>상태: {{ city.status }}</p>
        <button class="detail-button" @click.stop="showDetail(city.name, city.status)">
          상세보기
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.practice-section h3 {
  margin: 12px 0 6px;
}

.status-bar {
  padding: 8px 10px;
  margin-top: 8px;
  border: 1px dashed var(--accent);
  border-radius: var(--r-md);
  background-color: var(--canvas);
}

.weather-card {
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  background-color: var(--canvas);
}

.detail-button {
  margin-top: 8px;
}

input {
  margin: 4px 0 8px;
  padding: 6px 8px;
  width: 100%;
  max-width: 360px;
}
</style>

<style></style>
