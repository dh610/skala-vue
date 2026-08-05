<script setup>
import { ref } from 'vue'
import LifecycleDemo from './LifecycleDemo.vue'

const showDemo = ref(true)
</script>

<template>
  <main class="challenge-page">
    <section class="controller">
      <div>
        <span class="status-dot" :class="{ active: showDemo }" aria-hidden="true"></span>
        실습 컴포넌트 상태: <strong>{{ showDemo ? '마운트됨' : '언마운트됨' }}</strong>
      </div>
      <button type="button" @click="showDemo = !showDemo">
        {{ showDemo ? '실습 컴포넌트 제거하기' : '실습 컴포넌트 다시 생성하기' }}
      </button>
    </section>

    <LifecycleDemo v-if="showDemo" />

    <section v-else class="unmounted-panel">
      <h2>컴포넌트가 제거되었습니다.</h2>
      <p><code>onUnmounted</code>가 실행되어 3초 타이머도 함께 정리됐습니다.</p>
    </section>
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

.controller {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  background: var(--paper);
}

.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 6px;
  border-radius: 50%;
  background: var(--line-strong);
}

.status-dot.active {
  background: var(--ok);
}

button {
  min-height: 38px;
  padding: 7px 12px;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
  background: var(--canvas);
  color: var(--ink);
  cursor: pointer;
}

button:hover {
  background: var(--canvas-deep);
}

.unmounted-panel {
  min-height: 220px;
  padding: 48px 20px;
  border: 1px dashed var(--line-strong);
  border-radius: var(--r-md);
  color: var(--ink-soft);
  text-align: center;
}

.unmounted-panel h2 {
  margin: 0 0 8px;
  color: var(--ink);
  font-size: 20px;
}

.unmounted-panel p {
  margin: 0;
}
</style>
