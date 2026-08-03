<script setup>
import { ref } from 'vue'

const count = ref(0)
const position = ref('')
const tagName = ref('')
const modifierMessage = ref('아직 이벤트가 발생하지 않았습니다.')

function showAlert() {
  alert('함수가 성공적으로 호출되었습니다!')
}

function getOnlyEvent(e) {
  position.value = `좌표: X=${e.clientX}, Y=${e.clientY}`
}

function getWithParam(name, e) {
  tagName.value = `대상: ${name} / 클릭된 태그: ${e.target.tagName}`
}

function handleLink() {
  modifierMessage.value = '수식어 덕분에 네이버로 이동하지 않고 함수만 실행되었습니다.'
}

function handleBox() {
  modifierMessage.value = '부모 박스가 클릭되었습니다.'
}

function handleBubblingButton() {
  modifierMessage.value = '1번 자식 버튼 클릭 후 부모 이벤트까지 전파됩니다.'
}

function handleStopButton() {
  modifierMessage.value = '2번 자식 버튼만 실행되고 부모 이벤트 전파는 차단됩니다.'
}

function handleOnce() {
  modifierMessage.value = '.once 버튼은 처음 한 번만 실행됩니다.'
}

function handleEnter(e) {
  modifierMessage.value = `Enter 입력 값: ${e.target.value}`
}
</script>

<template>
  <main class="challenge-page">
    <h1>Vue Event Handling Code Challenge</h1>

    <section class="practice-section">
      <h2>v-on Event Handler Example</h2>

      <h3>1. 인라인 연산 처리</h3>
      <p>현재 카운트: {{ count }}</p>
      <button @click="count++">1씩 증가</button>

      <h3>2. 스크립트 함수 호출</h3>
      <button @click="showAlert">알림창 띄우기</button>
    </section>

    <section class="practice-section">
      <h2>Event Object Example</h2>
      <p>좌표: {{ position }}</p>
      <p>태그: {{ tagName }}</p>
      <button @click="getOnlyEvent">클릭 좌표 알아내기</button>
      <button @click="getWithParam('회원A', $event)">회원 정보와 태그 확인</button>
    </section>

    <section class="practice-section">
      <h2>Event Modifier Example</h2>
      <p class="message-box">{{ modifierMessage }}</p>

      <h3>1. .prevent 기본 동작 막기</h3>
      <a href="https://www.naver.com" @click.prevent="handleLink">네이버 링크</a>

      <h3>2. .stop 이벤트 버블링 막기</h3>
      <div class="parent-box" @click="handleBox">
        <p>부모 영역 (클릭 시 메시지 변경)</p>
        <button @click="handleBubblingButton">버블링 발생 버튼</button>
        <button @click.stop="handleStopButton">버블링 차단 버튼</button>
      </div>

      <h3>3. .once 한 번만 실행하기</h3>
      <button @click.once="handleOnce">한 번만 실행되는 버튼</button>

      <h3>4. .enter 키보드 이벤트</h3>
      <input type="text" placeholder="입력 후 Enter" @keyup.enter="handleEnter" />
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

.message-box {
  padding: 10px;
  background-color: #f6f6f6;
  border-left: 4px solid #42b883;
}

.parent-box {
  padding: 20px;
  background-color: #eee;
}
</style>
