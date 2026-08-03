<script setup>
import { computed, reactive, ref, watch, watchEffect } from 'vue'

const count = ref(0)
const dummy = ref(0)
const doubleCount = computed(() => count.value * 2)

const currentCity = ref('서울')
const cityWatchLog = ref('아직 도시가 변경되지 않았습니다.')

watch(currentCity, (newCity, oldCity) => {
  cityWatchLog.value = `[감지] ${oldCity}에서 ${newCity}(으)로 변경됨`
})

const forecastCity = ref('서울')
const forecastPeriod = ref('오늘')
const multiWatchLog = ref('대기 중...')

watch([forecastCity, forecastPeriod], ([newCity, newPeriod], [oldCity, oldPeriod]) => {
  multiWatchLog.value = `[변경 감지] ${oldCity}(${oldPeriod}) -> ${newCity}(${newPeriod})`
})

const member = ref({ name: '홍길동', age: 20 })
const deepWatchLog = ref('아직 반응 없음')
const ageWatchLog = ref('아직 반응 없음')

watch(
  member,
  (newMember) => {
    deepWatchLog.value = `[deep 감지] 현재 이름: ${newMember.name}, 나이: ${newMember.age}`
  },
  { deep: true },
)

watch(
  () => member.value.age,
  (newAge, oldAge) => {
    ageWatchLog.value = `[나이 감지] ${oldAge}세 -> ${newAge}세`
  },
)

const product = reactive({ productName: '노트북', price: 1000 })
const reactiveWatchLog = ref('대기 중...')
const priceWatchLog = ref('대기 중...')

watch(product, (newProduct, oldProduct) => {
  reactiveWatchLog.value = `[전체 감시] 이전/현재 참조의 가격: ${oldProduct.price}원 / ${newProduct.price}원`
})

watch(
  () => product.price,
  (newPrice, oldPrice) => {
    priceWatchLog.value = `[가격 감지] ${oldPrice}원 -> ${newPrice}원`
  },
)

const effectName = ref('홍길동')
const effectAge = ref(20)
const effectLog = ref('')

watchEffect(() => {
  effectLog.value = `[자동 감지] 이름: ${effectName.value} / 나이: ${effectAge.value}세`
})
</script>

<template>
  <main class="challenge-page">
    <h1>125페이지 Code Challenge</h1>

    <section class="practice-section">
      <h2>1. computed() 캐싱 동작</h2>
      <p>count: {{ count }} / dummy: {{ dummy }}</p>
      <div class="controls">
        <button type="button" @click="count++">count 증가</button>
        <button type="button" @click="dummy++">dummy 증가</button>
      </div>
      <p class="monitor">Computed 결과: {{ doubleCount }}</p>
      <small>dummy만 변경하면 computed의 의존 값인 count는 바뀌지 않습니다.</small>
    </section>

    <section class="practice-section">
      <h2>2. watch() 기본 예제</h2>
      <p>현재 선택된 도시: <strong>{{ currentCity }}</strong></p>
      <div class="controls">
        <button v-for="city in ['서울', '수원', '부산']" :key="city" @click="currentCity = city">
          {{ city }} 선택
        </button>
      </div>
      <p class="monitor">{{ cityWatchLog }}</p>
    </section>

    <section class="practice-section">
      <h2>3. watch() 다중 소스 감시</h2>
      <div class="form-row">
        <label>
          도시
          <select v-model="forecastCity">
            <option>서울</option>
            <option>수원</option>
            <option>부산</option>
          </select>
        </label>
        <fieldset>
          <legend>날짜</legend>
          <label v-for="period in ['오늘', '내일', '주간예보']" :key="period">
            <input v-model="forecastPeriod" type="radio" :value="period" />
            {{ period }}
          </label>
        </fieldset>
      </div>
      <p class="monitor">{{ multiWatchLog }}</p>
    </section>

    <section class="practice-section">
      <h2>4. watch() Deep Watch</h2>
      <p>이름: {{ member.name }} / 나이: {{ member.age }}세</p>
      <div class="controls">
        <button type="button" @click="member.name = member.name === '홍길동' ? '이순신' : '홍길동'">
          이름 변경
        </button>
        <button type="button" @click="member.age++">나이 변경</button>
      </div>
      <div class="monitor-stack">
        <p class="monitor">전체 객체: {{ deepWatchLog }}</p>
        <p class="monitor monitor-alt">나이 속성: {{ ageWatchLog }}</p>
      </div>
    </section>

    <section class="practice-section">
      <h2>5. watch() reactive 데이터</h2>
      <p>상품명: {{ product.productName }} / 가격: {{ product.price }}원</p>
      <button type="button" @click="product.price += 500">가격 500원 인상</button>
      <div class="monitor-stack">
        <p class="monitor">{{ reactiveWatchLog }}</p>
        <p class="monitor monitor-alt">{{ priceWatchLog }}</p>
      </div>
      <small>reactive 객체 전체 감시는 이전 값과 현재 값이 같은 객체를 참조합니다.</small>
    </section>

    <section class="practice-section">
      <h2>6. watchEffect() 자동 감시</h2>
      <p>이름: {{ effectName }} / 나이: {{ effectAge }}세</p>
      <div class="controls">
        <button type="button" @click="effectName = effectName === '홍길동' ? '이순신' : '홍길동'">
          이름 변경
        </button>
        <button type="button" @click="effectAge++">나이 한 살 추가</button>
      </div>
      <p class="monitor">{{ effectLog }}</p>
      <small>watchEffect는 화면이 처음 열릴 때도 즉시 한 번 실행됩니다.</small>
    </section>
  </main>
</template>

<style scoped>
.challenge-page {
  display: grid;
  gap: 16px;
  width: min(100%, 820px);
  margin: 0 auto;
}

.practice-section {
  padding: 18px;
  border: 1px solid #d7dce2;
  border-radius: 8px;
  background: #ffffff;
}

h1,
h2 {
  color: #1f2933;
}

h1 {
  margin: 0;
  font-size: 28px;
}

h2 {
  margin-top: 0;
  font-size: 19px;
}

.controls,
.form-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

button,
select {
  min-height: 34px;
  padding: 6px 10px;
  border: 1px solid #9ca3af;
  border-radius: 4px;
  background: #f7f8fa;
  color: #1f2933;
}

button {
  cursor: pointer;
}

button:hover {
  background: #e9eef3;
}

select {
  margin-left: 6px;
}

fieldset {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
  padding: 7px 10px;
  border: 1px solid #c8ced6;
  border-radius: 4px;
}

legend {
  padding: 0 4px;
}

.monitor-stack {
  display: grid;
  gap: 8px;
  margin-top: 12px;
}

.monitor {
  margin: 12px 0 0;
  padding: 10px;
  border-left: 4px solid #168a65;
  background: #effaf6;
}

.monitor-stack .monitor {
  margin: 0;
}

.monitor-alt {
  border-left-color: #3973ac;
  background: #f0f6fc;
}

small {
  display: block;
  margin-top: 8px;
  color: #5d6772;
}
</style>
