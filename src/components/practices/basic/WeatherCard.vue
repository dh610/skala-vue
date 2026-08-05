<script setup>
const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

function selectCard() {
  emit('select-card', props.weather)
}

function clickDetail() {
  emit('click-detail', props.weather)
}
</script>

<template>
  <article class="weather-card" :class="{ selected }" @click="selectCard">
    <div>
      <h3>
        {{ weather.name }} <span>({{ weather.condition }})</span>
      </h3>
      <p>현재 기온: {{ weather.temperature }}°C</p>
      <span class="temperature-label" :class="weather.temperature >= 25 ? 'hot' : 'mild'">
        {{ weather.temperature >= 25 ? '더움' : '선선함' }}
      </span>
    </div>
    <button type="button" @click.stop="clickDetail">상세보기</button>
  </article>
</template>

<style scoped>
.weather-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  min-height: 122px;
  padding: 15px;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
  background: var(--paper);
  cursor: pointer;
}

.weather-card.selected {
  border-color: var(--accent);
  box-shadow: inset 0 0 0 1px var(--accent);
}

h3,
p {
  margin: 0;
}

h3 {
  font-size: 17px;
}

h3 span {
  color: var(--ink-soft);
  font-weight: 500;
}

p {
  margin-top: 6px;
  color: var(--ink-soft);
}

.temperature-label {
  display: inline-block;
  margin-top: 9px;
  padding: 3px 7px;
  border-radius: var(--r-sm);
  font-size: 12px;
  font-weight: 700;
}

.temperature-label.hot {
  background: var(--hot-bg);
  color: var(--danger);
}

.temperature-label.mild {
  background: var(--canvas-deep);
  color: var(--accent-dark);
}

button {
  width: 76px;
  min-height: 36px;
  padding: 6px 9px;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
  background: var(--canvas);
  color: var(--ink);
  cursor: pointer;
}

button:hover {
  background: var(--canvas-deep);
}

@media (max-width: 480px) {
  .weather-card {
    grid-template-columns: 1fr;
  }

  button {
    width: 100%;
  }
}
</style>
