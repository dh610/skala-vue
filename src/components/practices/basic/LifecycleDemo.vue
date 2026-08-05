<script setup>
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'

const count = ref(0)
const latestUpdateElement = ref(null)
const mountedAt = ref('')
let timerId = null

console.log('[setup] 컴포넌트가 메모리에 생성되었습니다.')

onMounted(() => {
  mountedAt.value = new Date().toLocaleTimeString('ko-KR')
  console.log('[onMounted] 컴포넌트가 화면에 부착되었습니다. 타이머를 시작합니다.')

  timerId = window.setInterval(() => {
    count.value++
  }, 3000)
})

onUpdated(() => {
  const message = `[onUpdated] DOM 업데이트 완료: 현재 count ${count.value}`

  if (latestUpdateElement.value) {
    latestUpdateElement.value.textContent = message
  }

  console.log(message)
})

onUnmounted(() => {
  if (timerId !== null) {
    window.clearInterval(timerId)
  }

  console.log('[onUnmounted] 컴포넌트가 소멸했습니다. 타이머 정리 완료.')
})
</script>

<template>
  <section class="demo-panel">
    <div class="counter-panel">
      <p class="label">실시간 타이머 카운트</p>
      <strong>{{ count }}</strong>
      <button type="button" @click="count++">수동으로 숫자 올리기</button>
    </div>

    <div class="log-panel">
      <h2>라이프사이클 로그</h2>
      <ol>
        <li>[setup] 반응형 상태와 훅 등록 완료</li>
        <li>[onMounted] {{ mountedAt }}에 화면 부착 및 타이머 시작</li>
        <li ref="latestUpdateElement">[onUpdated] 첫 데이터 변경을 기다리는 중</li>
      </ol>
      <p>언마운트 로그는 컴포넌트 제거 후 개발자 도구 콘솔에서 확인할 수 있습니다.</p>
    </div>
  </section>
</template>

<style scoped>
.demo-panel {
  display: grid;
  gap: 14px;
}

.counter-panel,
.log-panel {
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  background: var(--paper);
}

.counter-panel {
  display: grid;
  place-items: center;
  min-height: 190px;
  background: var(--canvas);
}

.label {
  margin: 0;
  color: var(--ink-soft);
  font-weight: 700;
}

.counter-panel strong {
  font-size: 48px;
  line-height: 1;
}

button {
  min-height: 36px;
  padding: 7px 12px;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
  background: var(--paper);
  color: var(--ink);
  cursor: pointer;
}

button:hover {
  background: var(--canvas-deep);
}

h2 {
  margin: 0 0 12px;
  font-size: 18px;
}

ol {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 24px;
}

.log-panel p {
  margin: 12px 0 0;
  color: var(--ink-soft);
  font-size: 13px;
}
</style>
