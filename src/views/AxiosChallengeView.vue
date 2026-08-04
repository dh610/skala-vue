<script setup>
import AxiosJson from '../components/practices/library/AxiosJson.vue'
import AxiosWeather from '../components/practices/library/AxiosWeather.vue'
</script>

<template>
  <main class="axios-page">
    <AxiosWeather />
    <AxiosJson />
  </main>
</template>

<style scoped>
.axios-page {
  display: grid;
  gap: 18px;
}
</style>
