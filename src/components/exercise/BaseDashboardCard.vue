<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="dashboard-card">
    <h2>{{ title }}</h2>
    <slot></slot>
  </section>
</template>

<style scoped>
.dashboard-card {
  padding: 18px;
  border: 1px solid #d7dce2;
  border-radius: 8px;
  background: #fff;
}

h2 {
  margin: 0 0 14px;
  font-size: 18px;
  font-weight: 700;
}
</style>
