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
    <div class="card-content">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
.dashboard-card {
  padding: 18px;
  border: 1px solid #d7dce2;
  border-radius: 8px;
  background: #ffffff;
}

h2 {
  margin: 0 0 14px;
  color: #202830;
  font-size: 18px;
}

.card-content {
  min-width: 0;
}
</style>
