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
  <article class="weather-card">
    <div>
      <h3>{{ weather.name }} <span>({{ weather.condition }})</span></h3>
      <p>현재 기온: {{ displayTemperature }}{{ configStore.unitSymbol }}</p>
      <span class="temperature-label" :class="weather.temperature >= 25 ? 'hot' : 'mild'">
        {{ weather.temperature >= 25 ? '🔥 더움' : '❄️ 선선함' }}
      </span>
    </div>
    <button type="button" @click="$emit('show-detail', weather.id)">상세보기</button>
  </article>
</template>

<style scoped>
.weather-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  min-height: 104px;
  padding: 15px;
  border: 1px solid #cfd6dd;
  border-radius: 6px;
  background: #fff;
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
  margin-top: 6px;
}

.temperature-label {
  display: inline-block;
  margin-top: 7px;
  padding: 3px 7px;
  border-radius: 3px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.temperature-label.hot {
  background: #ff6868;
}

.temperature-label.mild {
  background: #58aaf4;
}

button {
  min-height: 36px;
  padding: 6px 10px;
  border: 1px solid #3973ac;
  border-radius: 4px;
  background: #3973ac;
  color: #fff;
  cursor: pointer;
}

@media (max-width: 480px) {
  .weather-card {
    grid-template-columns: 1fr;
  }
}
</style>
