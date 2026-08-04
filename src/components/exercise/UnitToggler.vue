<script setup>
import { useConfigStore } from '../../stores/configStore.js'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>날씨 단위: {{ configStore.unitSymbol }}</span>
    <button type="button" @click="configStore.toggleUnit">단위 변경</button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  color: #52616f;
  font-size: 14px;
}

button {
  min-height: 34px;
  padding: 5px 9px;
  border: 1px solid #3973ac;
  border-radius: 4px;
  background: #3973ac;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

button:hover {
  background: #2d6397;
}
</style>
