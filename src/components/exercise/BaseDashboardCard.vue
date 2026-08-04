<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <ElCard class="dashboard-card" shadow="never">
    <template #header><strong>{{ title }}</strong></template>
    <slot></slot>
  </ElCard>
</template>

<style scoped>
.dashboard-card :deep(.el-card__header) strong {
  font-size: 17px;
  font-weight: 700;
}
</style>
