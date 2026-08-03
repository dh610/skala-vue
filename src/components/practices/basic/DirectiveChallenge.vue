<script setup>
import { ref } from 'vue'

const rawHtmlData =
  '이 글자는 <span style="color: red; font-weight: bold;">빨간색 굵은 글자</span>이다.'
const xssInputValue = ref('')
const xssMessage = ref('')
const textContent = '안녕하세요! <strong>Skala-Vue</strong> 강의입니다.'

const dynamicUrl = 'https://www.naver.com'
const logoImgSrc = 'https://vuejs.org/images/logo.png'
const isButtonDisabled = ref(true)

const isWarning = ref(false)
const themeClass = ref('bg-dark')
const textColor = ref('purple')
const boxWidth = ref(150)
const baseBoxStyle = ref({
  backgroundColor: '#42b883',
  height: '100px',
  transition: 'all 0.3s ease',
})

const id = 'user-profile-card'
const src = 'https://vuejs.org/images/logo.png'

const isLogged = ref(false)
const score = ref(85)
const isVisible = ref(true)

const fruits = ref(['사과', '바나나', '딸기'])
const user = ref({
  name: '홍길동',
  age: 25,
  role: '개발자',
})
const items = ref([
  { id: 'prod_101', name: '아이폰' },
  { id: 'prod_102', name: '갤럭시' },
])

const preMessage = ref('안녕하세요!')
const cloakMessage = ref('느린 네트워크에서도 안전하게 출력되는 메시지!')
const onceCount = ref(1)
const memoName = ref('홍길동')
const memoAge = ref(20)

function showXssMessage() {
  xssMessage.value = xssInputValue.value
}
</script>

<template>
  <main class="challenge-page">
    <h1>Vue Directive Code Challenge</h1>

    <section class="practice-section">
      <h2>v-html 디렉티브 학습</h2>
      <h3>일반 보간법 사용 결과:</h3>
      <p>{{ rawHtmlData }}</p>

      <h3>v-html 디렉티브 사용 결과:</h3>
      <p v-html="rawHtmlData"></p>
    </section>

    <section class="practice-section">
      <h2>v-html XSS 학습</h2>
      <input v-model="xssInputValue" placeholder="내용을 입력하세요" />
      <button @click="showXssMessage">확인</button>
      <div v-html="xssMessage"></div>
    </section>

    <section class="practice-section">
      <h2>v-text 디렉티브 학습</h2>
      <h3>1. 일반 보간법 결과:</h3>
      <p>출력: {{ textContent }}</p>

      <h3>2. v-text 디렉티브 결과:</h3>
      <p v-text="'출력: ' + textContent"></p>

      <h3>3. v-html 결과 비교:</h3>
      <p v-html="textContent"></p>
    </section>

    <section class="practice-section">
      <h2>v-bind 디렉티브 기본</h2>
      <h3>1. 동적 링크 연결</h3>
      <a :href="dynamicUrl" target="_blank" rel="noopener">여기를 클릭하면 네이버로 이동합니다</a>

      <h3>2. 동적 이미지 연결</h3>
      <img :src="logoImgSrc" alt="Vue 로고" class="vue-logo" />

      <h3>3. 버튼 비활성화 제어</h3>
      <p>현재 버튼 사용 불가능 상태: {{ isButtonDisabled }}</p>
      <button :disabled="isButtonDisabled">동의해야 클릭할 수 있는 버튼</button>
      <button @click="isButtonDisabled = !isButtonDisabled">위 버튼 잠금 해제/토글하기</button>
    </section>

    <section class="practice-section">
      <h2>v-bind 클래스 바인딩</h2>
      <h3>객체 형식</h3>
      <p :class="{ 'text-danger': isWarning }">현재 경고 상태: {{ isWarning }}</p>
      <button @click="isWarning = !isWarning">경고 상태 토글</button>

      <h3>배열 형식</h3>
      <div :class="[themeClass, isWarning ? 'border-red' : 'border-gray']">
        다중 클래스가 조립된 박스 구역입니다.
      </div>
    </section>

    <section class="practice-section">
      <h2>v-bind 스타일 바인딩</h2>
      <h3>1. 인라인 스타일 변수 조작</h3>
      <p :style="{ color: textColor, fontWeight: 'bold' }">이 글자의 색상은 실시간으로 바뀝니다.</p>
      <button @click="textColor = textColor === 'purple' ? 'blue' : 'purple'">
        글자 색상 토글
      </button>

      <h3>2. 다중 스타일 객체 조립</h3>
      <label for="box-width">박스 가로 크기(px): </label>
      <input id="box-width" v-model="boxWidth" type="number" step="50" />
      <div :style="[baseBoxStyle, { width: boxWidth + 'px' }]">
        <p class="box-label">가로 크기: {{ boxWidth }}px 박스</p>
      </div>
    </section>

    <section class="practice-section">
      <h2>v-bind 단축 문법</h2>
      <div :id>
        <img :src alt="Vue 로고" class="small-logo" />
      </div>
    </section>

    <section class="practice-section">
      <h2>v-if, v-else-if, v-else 디렉티브 학습</h2>
      <h3>1. 기본 로그인 상태 스위치</h3>
      <p v-if="isLogged">환영합니다! 회원 전용 화면입니다.</p>
      <p v-else>로그인이 필요합니다. 먼저 로그인해 주세요.</p>
      <button @click="isLogged = !isLogged">
        {{ isLogged ? '로그아웃 하기' : '로그인 하기' }}
      </button>

      <h3>2. 성적별 학점 등급 측정</h3>
      <label for="score">현재 점수 입력: </label>
      <input id="score" v-model="score" type="number" min="0" max="100" step="5" />
      <div v-if="score >= 90" class="grade-a">합격 등급: A 학점 (훌륭합니다!)</div>
      <div v-else-if="score >= 80" class="grade-b">합격 등급: B 학점 (양호합니다.)</div>
      <div v-else-if="score >= 70" class="grade-c">합격 등급: C 학점 (조금 더 분발하세요.)</div>
      <div v-else class="grade-f">합격 등급: F 학점 (재시험 대상입니다.)</div>
    </section>

    <section class="practice-section">
      <h2>v-show 디렉티브 학습</h2>
      <button @click="isVisible = !isVisible">화면 토글하기</button>
      <div v-show="isVisible" class="box">
        <p>v-show 상자</p>
        <p>조건이 false가 되면 CSS display: none이 붙습니다.</p>
      </div>
    </section>

    <section class="practice-section">
      <h2>v-for 디렉티브 학습</h2>
      <h3>1. 배열 렌더링</h3>
      <ul>
        <li v-for="(fruit, index) in fruits" :key="index">{{ index + 1 }}번 과일: {{ fruit }}</li>
      </ul>

      <h3>2. 객체 렌더링</h3>
      <ul>
        <li v-for="(value, key, index) in user" :key="key">
          [{{ index }}] {{ key }} : {{ value }}
        </li>
      </ul>

      <h3>3. 배열 내 객체 렌더링</h3>
      <ul>
        <li v-for="(item, index) in items" :key="item.id">[{{ index }}] {{ item.name }}</li>
      </ul>
    </section>

    <section class="practice-section">
      <h2>v-pre 디렉티브 학습</h2>
      <p>일반 출력: {{ preMessage }}</p>
      <p v-pre>v-pre 출력: {{ preMessage }}</p>
    </section>

    <section v-cloak class="practice-section">
      <h2>v-cloak 디렉티브 학습</h2>
      <p>{{ cloakMessage }}</p>
    </section>

    <section class="practice-section">
      <h2>v-once 디렉티브 학습</h2>
      <p>일반 변수 (실시간): {{ onceCount }}</p>
      <p v-once>v-once 변수 (최초 고정): {{ onceCount }}</p>
      <button @click="onceCount++">숫자 증가 버튼</button>
    </section>

    <section class="practice-section">
      <h2>v-memo 디렉티브 학습</h2>
      <div
        v-memo="[memoName]"
        style="padding: 20px; border: 1px solid #42b883; margin-bottom: 10px"
      >
        <p>v-memo 적용 영역 (기준: memoName)</p>
        <p>이름: {{ memoName }}</p>
        <p>나이: {{ memoAge }} (memoName이 바뀌어야 얘도 갱신됨)</p>
      </div>
      <button @click="memoName = '이순신'">1. 이름 변경 (이순신)</button> &nbsp;
      <button @click="memoAge++">2. 나이 한 살 추가 (memoage++)</button>
    </section>
  </main>
</template>

<style scoped>
.challenge-page {
  display: grid;
  gap: 20px;
  padding: 20px;
}

.practice-section {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.practice-section button,
.practice-section input {
  margin: 4px;
}

.vue-logo {
  width: 100px;
}

.small-logo {
  width: 50px;
}

.text-danger {
  color: red;
  font-weight: bold;
}

.bg-dark {
  padding: 15px;
  color: white;
  background-color: #333;
}

.border-red {
  border: 3px solid red;
}

.border-gray {
  border: 3px solid #ccc;
}

.box-label {
  padding: 10px;
  color: white;
  text-align: center;
}

.grade-a {
  color: green;
  font-weight: bold;
}

.grade-b {
  color: blue;
}

.grade-c {
  color: orange;
}

.grade-f {
  color: red;
  font-weight: bold;
}

.box {
  padding: 10px;
  margin-top: 5px;
  color: white;
  border-radius: 5px;
  background-color: #3498db;
}

[v-cloak] {
  display: none !important;
}

.memo-box {
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid #42b883;
}
</style>
