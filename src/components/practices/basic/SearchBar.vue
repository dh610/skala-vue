<script setup>
defineProps({
  searchQuery: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update-query'])

function updateQuery(event) {
  emit('update-query', event.target.value)
}
</script>

<template>
  <div class="search-bar">
    <label for="weather-city-search">도시 검색 (한글 즉시 동기화)</label>
    <input
      id="weather-city-search"
      type="search"
      :value="searchQuery"
      placeholder="검색할 도시 이름 입력"
      @input="updateQuery"
    />
    <p>
      검색 중인 도시: <strong>{{ searchQuery || '전체 도시' }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search-bar {
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: var(--r-sm);
  background: var(--canvas);
}

label {
  display: block;
  margin-bottom: 6px;
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 700;
}

input {
  width: 100%;
  min-height: 42px;
  padding: 8px 10px;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
  background: var(--paper);
  color: var(--ink);
  font-size: 16px;
}

p {
  margin: 8px 0 0;
  color: var(--ink-soft);
  font-size: 14px;
}
</style>
