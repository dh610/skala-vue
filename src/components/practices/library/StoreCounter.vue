<script setup>
import { useCounterStore } from '../../../stores/counter.js'

const counterStore = useCounterStore()
</script>

<template>
  <main class="counter-page">
    <p class="eyebrow">Pinia Code Challenge</p>
    <h1>Counter Store 활용 실습</h1>

    <section class="counter-panel">
      <div class="counter-value">
        <span>원본 카운트 데이터 (state)</span>
        <strong>{{ counterStore.count }}</strong>
      </div>

      <div class="counter-value">
        <span>2배 연산 데이터 (getters)</span>
        <strong>{{ counterStore.doubleCount }}</strong>
      </div>

      <button type="button" @click="counterStore.increment">숫자 1 증가 (actions)</button>
    </section>
  </main>
</template>

<style scoped>
.counter-page {
  width: min(100%, 680px);
  margin: 0 auto;
}

.eyebrow {
  margin: 0 0 4px;
  color: #52616f;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 20px;
  font-size: 28px;
  font-weight: 800;
}

.counter-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding: 20px;
  border: 1px solid #d7dce2;
  border-radius: 8px;
  background: #fff;
}

.counter-value {
  display: grid;
  gap: 8px;
  min-width: 0;
  padding: 16px;
  background: #f3f6f8;
}

.counter-value span {
  color: #52616f;
  font-size: 14px;
}

.counter-value strong {
  color: #1f4f78;
  font-size: 32px;
  font-weight: 800;
}

button {
  grid-column: 1 / -1;
  min-height: 42px;
  border: 1px solid #3973ac;
  border-radius: 4px;
  background: #3973ac;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

button:hover {
  background: #2d6397;
}

@media (max-width: 520px) {
  .counter-panel {
    grid-template-columns: 1fr;
  }

  button {
    grid-column: auto;
  }
}
</style>
