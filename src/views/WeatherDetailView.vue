<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore.js'
import { useWeatherStore } from '../stores/weatherStore.js'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()

// 라우트로 구동되는 모달. 닫히면 홈(`/`)으로 돌아간다.
const visible = ref(true)

watch(visible, (open) => {
  if (!open) router.push('/')
})

// 상세로 직접 진입한 경우에도 해당 도시가 속한 국가를 불러온다.
onMounted(() => {
  const code = weatherStore.countryCodeOfCity(route.params.cityId)
  if (code) weatherStore.loadCountry(code)
})

const weather = computed(() => weatherStore.findCity(route.params.cityId))

const displayTemperature = computed(() => {
  const celsius = weather.value?.temperature
  if (celsius === undefined) return ''
  return configStore.unit === 'fahrenheit' ? Math.round((celsius * 9) / 5 + 32) : celsius
})

const observedText = computed(() => {
  const observedAt = weather.value?.observedAt
  if (!observedAt) return ''
  return observedAt.toLocaleString('ko-KR', {
    timeZone: weather.value?.tz,
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})

const localTime = computed(() => {
  const tz = weather.value?.tz
  if (!tz) return ''
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())
})
</script>

<template>
  <ElDialog
    v-model="visible"
    class="detail-dialog"
    width="min(540px, 92vw)"
    align-center
    append-to-body
  >
    <template #header>
      <div class="detail-head">
        <div>
          <h2>{{ weather ? weather.name : '도시를 찾을 수 없습니다' }}</h2>
          <p v-if="weather">
            지역 상세 기상관측<span v-if="localTime"> · 현지 {{ localTime }}</span>
          </p>
          <p v-else>요청한 도시 코드에 해당하는 데이터가 없습니다.</p>
        </div>
        <span v-if="weather" class="live-tag" :class="{ 'is-live': weather.live }">
          {{ weather.live ? '실시간 관측' : '목데이터' }}
        </span>
      </div>
    </template>

    <template v-if="weather">
      <p class="temperature">
        {{ displayTemperature }}<span>{{ configStore.unitSymbol }}</span>
      </p>

      <ElDescriptions :column="3" border>
        <ElDescriptionsItem label="날씨">{{ weather.condition }}</ElDescriptionsItem>
        <ElDescriptionsItem label="습도">{{ weather.humidity }}%</ElDescriptionsItem>
        <ElDescriptionsItem label="풍속">{{ weather.wind }}m/s</ElDescriptionsItem>
      </ElDescriptions>

      <p v-if="observedText" class="observed">관측 시각: {{ observedText }}</p>
    </template>

    <template #footer>
      <ElButton @click="visible = false">닫기</ElButton>
    </template>
  </ElDialog>
</template>

<style scoped>
.detail-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--s2);
  padding-right: var(--s2);
}

.detail-head h2 {
  margin: 0;
  color: var(--ink);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.detail-head p {
  margin: 2px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.live-tag {
  flex: 0 0 auto;
  padding: 4px 12px;
  border-radius: var(--pill);
  background: var(--canvas-deep);
  color: var(--muted);
  font-size: 12px;
  font-weight: 700;
}

.live-tag.is-live {
  background: var(--accent-bg);
  color: var(--accent-dark);
}

.temperature {
  margin: 0 0 var(--s3);
  color: var(--ink);
  font-family: var(--font-serif);
  font-size: clamp(64px, 20vw, 96px);
  font-weight: 600;
  line-height: 0.9;
  letter-spacing: -0.03em;
}

.temperature span {
  margin-left: 4px;
  color: var(--muted);
  font-family: var(--font-sans);
  font-size: 26px;
  font-weight: 700;
}

.observed {
  margin: var(--s2) 0 0;
  color: var(--muted);
  font-size: 13px;
}
</style>
