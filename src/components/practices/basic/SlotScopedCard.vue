<script setup>
import { ref } from 'vue'

const message = ref('현재 서버 상태 정상')
const userCount = ref(150)
</script>

<template>
  <article class="slot-card">
    <div class="child-heading">
      <span>Child data</span>
      <button type="button" @click="userCount++">접속자 추가</button>
    </div>
    <slot :text="message" :count="userCount">
      <p class="fallback">부모가 마크업을 주입하지 않은 Scoped Slot 기본 화면</p>
    </slot>
  </article>
</template>

<style scoped>
.slot-card {
  min-height: 116px;
  padding: 16px;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
  background: var(--paper);
}

.child-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.child-heading span {
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 700;
}

button {
  min-height: 32px;
  padding: 5px 9px;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
  background: var(--canvas);
  color: var(--ink);
  cursor: pointer;
}

button:hover {
  background: var(--canvas-deep);
}

.fallback {
  margin: 0;
  color: var(--ink-soft);
}
</style>
