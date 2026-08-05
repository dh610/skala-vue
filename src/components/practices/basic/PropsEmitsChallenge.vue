<script setup>
import { ref } from 'vue'
import PropsEmitsChild from './PropsEmitsChild.vue'

const message = ref('Parent 초기 메시지')
const draftMessage = ref('Parent에서 변경한 데이터')
const lastEventPayload = ref('아직 자식 이벤트를 받지 않았습니다.')

function sendPropToChild() {
  const nextMessage = draftMessage.value.trim()

  if (nextMessage) {
    message.value = nextMessage
  }
}

function handleUpdateRequest(newValue) {
  message.value = newValue
  lastEventPayload.value = newValue
}
</script>

<template>
  <main class="challenge-page">
    <section class="parent-panel">
      <div class="panel-heading">
        <span>Parent</span>
        <h2>상위 컴포넌트</h2>
      </div>

      <p class="state-label">현재 부모 상태</p>
      <p class="state-value">{{ message }}</p>

      <div class="parent-controls">
        <label for="parent-message">자식에게 보낼 Props</label>
        <div class="input-row">
          <input id="parent-message" v-model="draftMessage" type="text" />
          <button type="button" @click="sendPropToChild">Props 변경</button>
        </div>
      </div>

      <div class="direction-label" aria-hidden="true">
        <span>Props 내려보내기</span>
        <span>Emits 올려보내기</span>
      </div>

      <PropsEmitsChild :parent-data="message" @update-request="handleUpdateRequest" />

      <p class="event-status" aria-live="polite">
        마지막 Emit payload: <strong>{{ lastEventPayload }}</strong>
      </p>
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

.parent-panel {
  padding: 20px;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-md);
  background: var(--canvas);
}

.panel-heading {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 16px;
}

.panel-heading span {
  padding: 3px 7px;
  border-radius: var(--r-sm);
  background: var(--ok);
  color: var(--paper);
  font-size: 12px;
  font-weight: 700;
}

h2,
p {
  margin: 0;
}

h2 {
  font-size: 18px;
}

.state-label,
.parent-controls label {
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 700;
}

.state-value {
  min-height: 46px;
  margin-top: 6px;
  padding: 11px;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
  background: var(--paper);
  font-weight: 700;
}

.parent-controls {
  margin-top: 16px;
}

.parent-controls label {
  display: block;
  margin-bottom: 5px;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
}

input,
button {
  min-height: 38px;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
}

input {
  min-width: 0;
  padding: 7px 9px;
  background: var(--paper);
  color: var(--ink);
}

button {
  padding: 7px 12px;
  background: var(--paper);
  color: var(--ink);
  cursor: pointer;
}

button:hover {
  background: var(--canvas-deep);
}

.direction-label {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 18px 4px 8px;
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 700;
}

.event-status {
  margin-top: 14px;
  padding: 10px;
  border-left: 4px solid var(--ok);
  background: var(--paper);
}

@media (max-width: 520px) {
  .parent-panel {
    padding: 14px;
  }

  .input-row {
    grid-template-columns: 1fr;
  }
}
</style>
