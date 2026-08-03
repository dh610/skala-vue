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
      <h3>{{ weather.name }} <span>({{ weather.condition }})</span></h3>
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
  border: 1px solid #cfd6dd;
  border-radius: 6px;
  background: #ffffff;
  cursor: pointer;
}

.weather-card.selected {
  border-color: #3973ac;
  box-shadow: inset 0 0 0 1px #3973ac;
}

h3,
p {
  margin: 0;
}

h3 {
  font-size: 17px;
}

h3 span {
  color: #52616f;
  font-weight: 500;
}

p {
  margin-top: 6px;
  color: #52616f;
}

.temperature-label {
  display: inline-block;
  margin-top: 9px;
  padding: 3px 7px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
}

.temperature-label.hot {
  background: #fff0ec;
  color: #a13c28;
}

.temperature-label.mild {
  background: #eaf4ff;
  color: #2d6397;
}

button {
  width: 76px;
  min-height: 36px;
  padding: 6px 9px;
  border: 1px solid #8d99a5;
  border-radius: 4px;
  background: #f7f8fa;
  color: #202830;
  cursor: pointer;
}

button:hover {
  background: #e9f0f2;
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
