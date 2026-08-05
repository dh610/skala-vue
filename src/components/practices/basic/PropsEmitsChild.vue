<script setup>
defineProps({
  parentData: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-request'])

function sendNotification() {
  emit('update-request', 'Child에서 가공한 새로운 데이터')
}
</script>

<template>
  <section class="child-panel">
    <div class="panel-heading">
      <span>Child</span>
      <h2>하위 컴포넌트</h2>
    </div>

    <p class="data-label">수신된 Props 데이터</p>
    <p class="data-value">{{ parentData }}</p>

    <button type="button" @click="sendNotification">상위 컴포넌트로 갱신 요청</button>
  </section>
</template>

<style scoped>
.child-panel {
  padding: 18px;
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
  background: var(--accent);
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

.data-label {
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 700;
}

.data-value {
  min-height: 46px;
  margin: 6px 0 14px;
  padding: 11px;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
  background: var(--paper);
  font-weight: 700;
}

button {
  min-height: 38px;
  padding: 7px 12px;
  border: 1px solid var(--accent);
  border-radius: var(--r-sm);
  background: var(--accent);
  color: var(--paper);
  cursor: pointer;
}

button:hover {
  background: var(--accent-dark);
}
</style>
