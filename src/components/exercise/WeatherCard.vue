<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore.js'

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

defineEmits(['show-detail'])

const configStore = useConfigStore()
const displayTemperature = computed(() => {
  const celsius = props.weather.temperature
  return configStore.unit === 'fahrenheit' ? Math.round((celsius * 9) / 5 + 32) : celsius
})
</script>

<template>
  <ElCard class="weather-card" shadow="hover">
    <div>
      <h3>{{ weather.name }} <span>({{ weather.condition }})</span></h3>
      <p>현재 기온: {{ displayTemperature }}{{ configStore.unitSymbol }}</p>
      <ElTag :type="weather.temperature >= 25 ? 'danger' : 'primary'" effect="dark">
        {{ weather.temperature >= 25 ? '더움' : '선선함' }}
      </ElTag>
    </div>
    <ElButton type="primary" plain @click="$emit('show-detail', weather.id)">상세보기</ElButton>
  </ElCard>
</template>

<style scoped>
.weather-card {
  min-height: 112px;
}

.weather-card :deep(.el-card__body) {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
}

h3,
p {
  margin: 0;
}

h3 {
  font-size: 17px;
  font-weight: 700;
}

h3 span,
p {
  color: #52616f;
}

p {
  margin: 6px 0;
}

@media (max-width: 480px) {
  .weather-card :deep(.el-card__body) {
    grid-template-columns: 1fr;
  }
}
</style>
