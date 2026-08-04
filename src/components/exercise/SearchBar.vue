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
  <ElInput
    id="city-search"
    clearable
    :value="modelValue"
    placeholder="검색할 도시 이름 입력"
    @input="$emit('update:modelValue', $event)"
  />
</template>
