<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <!--
    카드 안에 카드가 겹치지 않도록 배경 없는 '구획' 형태로 둔다.
    slot으로 부모가 검색바 / 날씨 현황을 주입하는 구조는 그대로 유지.
  -->
  <section class="dashboard-card">
    <header class="dashboard-card__head">
      <h2>{{ title }}</h2>
      <slot name="meta"></slot>
    </header>
    <slot></slot>
  </section>
</template>

<style scoped>
.dashboard-card {
  display: grid;
  gap: 12px;
}

.dashboard-card__head {
  display: flex;
  align-items: center;
  gap: var(--s1);
}

.dashboard-card__head h2 {
  margin: 0;
  color: var(--ink);
  font-size: 15px;
  font-weight: 800;
}

.dashboard-card__head h2::before {
  content: '';
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 8px;
  border-radius: 50%;
  background: var(--accent);
  vertical-align: middle;
}
</style>
