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
  border: 1px solid #cfd6dd;
  border-radius: 6px;
  background: #ffffff;
}

.child-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.child-heading span {
  color: #52616f;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

button {
  min-height: 32px;
  padding: 5px 9px;
  border: 1px solid #8d99a5;
  border-radius: 4px;
  background: #f7f8fa;
  color: #202830;
  cursor: pointer;
}

button:hover {
  background: #e9f0f2;
}

.fallback {
  margin: 0;
  color: #5d6772;
}
</style>
