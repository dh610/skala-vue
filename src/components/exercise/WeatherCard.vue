<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore.js'

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  // 전역 검색 결과에서 국가명을 함께 보여줄 때 사용 (없으면 표시 안 함)
  region: {
    type: String,
    default: '',
  },
})

defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

const displayTemperature = computed(() => {
  const celsius = props.weather.temperature
  return configStore.unit === 'fahrenheit' ? Math.round((celsius * 9) / 5 + 32) : celsius
})

const isHot = computed(() => props.weather.temperature >= 25)
</script>

<template>
  <article
    class="weather-card"
    :class="{ 'is-selected': selected }"
    @click="$emit('select-card', weather)"
  >
    <div class="card-top">
      <div class="card-title">
        <span v-if="region" class="region">{{ region }}</span>
        <h3>{{ weather.name }}</h3>
      </div>
      <span class="temp-tag" :class="isHot ? 'is-hot' : 'is-cool'">
        {{ isHot ? '더움' : '선선함' }}
      </span>
    </div>

    <p class="condition">{{ weather.condition }}</p>

    <!-- 온도 — serif 디스플레이 (참조의 mono 숫자와 구분) -->
    <p class="temperature">
      {{ displayTemperature }}<em>{{ configStore.unitSymbol }}</em>
    </p>

    <!-- 하단 버튼은 구분선으로 카드 본문(선택)과 클릭 영역을 명확히 나눈다 -->
    <div class="card-foot">
      <button type="button" class="detail-button" @click.stop="$emit('click-detail', weather)">
        상세 날씨 보기
      </button>
    </div>
  </article>
</template>

<style scoped>
.weather-card {
  display: grid;
  gap: 8px;
  padding: var(--s3);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  background: var(--paper);
  cursor: pointer;
  transition:
    border-color 0.15s,
    background 0.15s;
}

.weather-card:hover {
  border-color: var(--line-strong);
}

/* 선택: 먹색 강조 테두리 + 좌측 오커 마커 */
.weather-card.is-selected {
  border-color: var(--line-strong);
  box-shadow: inset 3px 0 0 var(--accent);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--s1);
}

.region {
  display: block;
  margin-bottom: 2px;
  color: var(--accent-dark);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

h3 {
  margin: 0;
  color: var(--ink);
  font-size: 17px;
  font-weight: 800;
}

.condition {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}

.temperature {
  margin: 2px 0 6px;
  color: var(--ink);
  font-family: var(--font-serif);
  font-size: 52px;
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.03em;
}

.temperature em {
  font-style: normal;
  font-size: 0.36em;
  color: var(--muted);
}

/* 온도 칩: 각진 라벨 */
.temp-tag {
  padding: 3px 9px;
  border: 1px solid currentcolor;
  border-radius: var(--r-sm);
  font-size: 11.5px;
  font-weight: 700;
}

.temp-tag.is-hot {
  color: var(--hot);
  background: var(--hot-bg);
}

.temp-tag.is-cool {
  color: var(--cool);
  background: var(--cool-bg);
}

/* 하단 액션 영역: 구분선으로 본문(선택)과 분리 */
.card-foot {
  margin-top: 4px;
  padding-top: var(--s2);
  border-top: 1px solid var(--line);
}

/* 상세 버튼: 전역 button 스타일(테두리 + hover 반전)을 그대로 써서 클릭 대상임을 명확히 */
.detail-button {
  width: 100%;
}
</style>
