<script setup>
import { useConfigStore } from '../../stores/configStore.js'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>날씨 단위: {{ configStore.unitSymbol }}</span>
    <ElButton type="primary" size="small" @click="configStore.toggleUnit">단위 변경</ElButton>
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

</style>
