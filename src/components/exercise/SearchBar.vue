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
  <input
    id="city-search"
    type="search"
    :value="modelValue"
    placeholder="검색할 도시 이름 입력"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<style scoped>
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
