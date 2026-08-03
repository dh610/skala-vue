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
    <p>검색 중인 도시: <strong>{{ searchQuery || '전체 도시' }}</strong></p>
  </div>
</template>

<style scoped>
.search-bar {
  padding: 14px;
  border: 1px solid #dce2e7;
  border-radius: 6px;
  background: #f8fafb;
}

label {
  display: block;
  margin-bottom: 6px;
  color: #52616f;
  font-size: 13px;
  font-weight: 700;
}

input {
  width: 100%;
  min-height: 42px;
  padding: 8px 10px;
  border: 1px solid #929da8;
  border-radius: 4px;
  background: #ffffff;
  color: #202830;
  font-size: 16px;
}

p {
  margin: 8px 0 0;
  color: #52616f;
  font-size: 14px;
}
</style>
