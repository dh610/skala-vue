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

// TODO 1) :value/@input(즉시) vs v-model.trim.lazy(지연+트림) 동작 비교
const instantInput = ref('')
const deferredInput = ref('')

// TODO 2) v-memo 리렌더 확인용: 관계없는 상태
const unrelatedTick = ref(0)

function updateInstant(event) {
  instantInput.value = event.target.value
}

function renderLog(cityName) {
  // v-memo가 걸린 카드가 실제로 다시 렌더될 때만 콘솔에 찍힌다.
  console.log(`[render] ${cityName} 카드 렌더링`)
  return ''
}

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

      <div class="compare-box">
        <h3>5) 동작 비교 — 즉시(:value/@input) vs 지연·트림(v-model.trim.lazy)</h3>
        <label>
          A. 즉시 반영
          <input :value="instantInput" placeholder="입력 즉시 반영" @input="updateInstant" />
        </label>
        <p>A 값: "{{ instantInput }}"</p>
        <label>
          B. 지연 + 트림 (입력 후 Enter 또는 포커스 해제 시 앞뒤 공백 제거하고 반영)
          <input v-model.trim.lazy="deferredInput" placeholder="  Enter/Blur 시 반영  " />
        </label>
        <p>B 값: "{{ deferredInput }}"</p>
      </div>
    </section>

    <section class="practice-section">
      <h2>날씨 Mockup (v-for, v-if, v-memo, 이벤트)</h2>

      <!-- TODO 2) v-memo 리렌더 확인: 관계없는 상태를 바꿔도 카드가 다시 렌더되지 않는다 -->
      <div class="controls">
        <button type="button" @click="unrelatedTick++">
          관계없는 상태 변경 ({{ unrelatedTick }})
        </button>
        <button type="button" @click="weatherList[0].temp++">서울 기온 +1</button>
        <small
          >콘솔에서 카드 렌더 로그를 확인하세요. v-memo 덕분에 관계없는 상태 변경은 카드를 다시
          렌더하지 않습니다.</small
        >
      </div>

      <div v-if="filteredWeather.length === 0" class="empty-state">해당 도시가 없습니다.</div>
      <div
        v-for="city in filteredWeather"
        :key="city.id"
        v-memo="[city.temp, city.name]"
        class="weather-card"
        @click="selectCity(city.name)"
      >
        <span hidden>{{ renderLog(city.name) }}</span>
        <h3>{{ city.name }}</h3>
        <p>기온: {{ city.temp }}°C</p>
        <!-- TODO 3) 25/20도 기준 3단계 라벨 (v-if / v-else-if / v-else) -->
        <p v-if="city.temp >= 25">🔥 더움 (25도 이상)</p>
        <p v-else-if="city.temp >= 20">🌤 보통 (20~24도)</p>
        <p v-else>❄️ 선선함 (20도 미만)</p>
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

.compare-box {
  margin-top: 12px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  background: var(--canvas);
}

.compare-box label {
  display: block;
  margin-top: 8px;
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 700;
}

input {
  margin: 4px 0 8px;
  padding: 6px 8px;
  width: 100%;
  max-width: 360px;
}
</style>

<style></style>
