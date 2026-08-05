<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore.js'

const configStore = useConfigStore()

// ElSwitch는 boolean을 다루므로 store의 unit 문자열과 양방향으로 이어준다.
const isFahrenheit = computed({
  get: () => configStore.unit === 'fahrenheit',
  set: () => configStore.toggleUnit(),
})
</script>

<template>
  <div class="unit-toggler">
    <span class="unit-label" :class="{ active: !isFahrenheit }">℃</span>
    <ElSwitch v-model="isFahrenheit" aria-label="온도 단위 변경" />
    <span class="unit-label" :class="{ active: isFahrenheit }">℉</span>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: var(--s1);
  margin-left: auto;
  padding: 4px 14px;
  border-radius: var(--pill);
  background: var(--canvas-deep);
}

.unit-label {
  color: var(--muted);
  font-size: 14px;
  font-weight: 700;
  transition: color 0.15s;
}

.unit-label.active {
  color: var(--accent-dark);
}

@media (max-width: 640px) {
  .unit-toggler {
    margin-left: 0;
    justify-content: center;
  }
}
</style>
