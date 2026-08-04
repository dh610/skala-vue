<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useConfigStore } from '../stores/configStore.js'

const route = useRoute()
const configStore = useConfigStore()
const weatherList = [
  { id: 'city-01', name: '서울', temperature: 28, condition: '맑음', humidity: 58, wind: 2.4 },
  { id: 'city-02', name: '수원', temperature: 24, condition: '비', humidity: 82, wind: 3.1 },
  { id: 'city-03', name: '부산', temperature: 26, condition: '구름', humidity: 71, wind: 4.2 },
  { id: 'city-04', name: '대구', temperature: 22, condition: '흐림', humidity: 65, wind: 1.8 },
  { id: 'city-05', name: '제주', temperature: 30, condition: '맑음', humidity: 68, wind: 5.3 },
]

const weather = computed(() => weatherList.find((city) => city.id === route.params.cityId))
const displayTemperature = computed(() => {
  const celsius = weather.value?.temperature

  if (celsius === undefined) {
    return ''
  }

  return configStore.unit === 'fahrenheit' ? Math.round((celsius * 9) / 5 + 32) : celsius
})
</script>

<template>
  <main class="detail-page">
    <template v-if="weather">
      <p class="eyebrow">지역 상세 기상관측</p>
      <h1>{{ weather.name }}</h1>
      <ElDescriptions :column="2" border>
        <ElDescriptionsItem label="날씨">{{ weather.condition }}</ElDescriptionsItem>
        <ElDescriptionsItem label="기온">
          {{ displayTemperature }}{{ configStore.unitSymbol }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="습도">{{ weather.humidity }}%</ElDescriptionsItem>
        <ElDescriptionsItem label="풍속">{{ weather.wind }}m/s</ElDescriptionsItem>
      </ElDescriptions>
    </template>
    <template v-else>
      <h1>도시 정보를 찾을 수 없습니다</h1>
      <p>요청한 도시 코드에 해당하는 날씨 데이터가 없습니다.</p>
    </template>
    <RouterLink class="back-link" to="/">
      <ElButton type="primary" plain>메인 대시보드로 돌아가기</ElButton>
    </RouterLink>
  </main>
</template>

<style scoped>
.detail-page {
  padding: 24px;
  border: 1px solid #d7dce2;
  border-radius: 8px;
}

.eyebrow {
  margin: 0;
  color: #52616f;
  font-size: 13px;
  font-weight: 700;
}

h1 {
  margin: 4px 0 20px;
  font-size: 28px;
  font-weight: 800;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  font-weight: 700;
}
</style>
