<script setup>
import UnitToggler from './components/exercise/UnitToggler.vue'
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/">🌤 종합실습 5: 스토어적용</RouterLink>
      <div class="navigation-bar">
        <nav aria-label="주요 메뉴">
          <RouterLink to="/">🌦 날씨 대시보드</RouterLink>
          <RouterLink to="/about">ℹ️ 서비스 소개</RouterLink>
          <RouterLink to="/counter">Pinia 카운터</RouterLink>
          <RouterLink to="/axios">Axios 실습</RouterLink>
          <RouterLink to="/element-plus">Element Plus</RouterLink>
        </nav>
        <UnitToggler />
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.app-shell {
  width: min(100%, 860px);
  margin: 0 auto;
}

.site-header {
  display: grid;
  gap: 14px;
  margin-bottom: 28px;
}

.navigation-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 13px 16px;
  border: 1px solid #d7dce2;
  border-radius: 6px;
  background: #fff;
}

.brand {
  padding-bottom: 12px;
  border-bottom: 1px solid #d7dce2;
  color: #202830;
  font-size: 21px;
  font-weight: 800;
}

nav {
  display: flex;
  gap: 8px;
}

nav a {
  padding: 7px 10px;
  border-radius: 4px;
  color: #697581;
  font-weight: 700;
}

nav a.router-link-exact-active {
  background: #e9f2f8;
  color: #1f4f78;
}

@media (max-width: 520px) {
  .navigation-bar {
    align-items: flex-start;
    flex-direction: column;
  }

  nav {
    flex-wrap: wrap;
  }

  .unit-toggler {
    margin-left: 0;
  }
}
</style>
