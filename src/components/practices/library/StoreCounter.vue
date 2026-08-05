<script setup>
import { useCounterStore } from '../../../stores/counter.js'

const counterStore = useCounterStore()
</script>

<template>
  <main class="counter-page">
    <p class="eyebrow">Pinia Code Challenge</p>

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
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 700;
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
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  background: var(--paper);
}

.counter-value {
  display: grid;
  gap: 8px;
  min-width: 0;
  padding: 16px;
  background: var(--canvas);
}

.counter-value span {
  color: var(--ink-soft);
  font-size: 14px;
}

.counter-value strong {
  color: var(--accent-dark);
  font-size: 32px;
  font-weight: 800;
}

button {
  grid-column: 1 / -1;
  min-height: 42px;
  border: 1px solid var(--accent);
  border-radius: var(--r-sm);
  background: var(--accent);
  color: var(--paper);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

button:hover {
  background: var(--accent-dark);
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
