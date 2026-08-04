<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label for="city-search">도시 검색</label>
  <input
    id="city-search"
    type="search"
    :value="modelValue"
    placeholder="검색할 도시 이름 입력"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style scoped>
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
  background: #fff;
  color: #202830;
  font-size: 16px;
}
</style>
