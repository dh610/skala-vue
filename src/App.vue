<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/">SKALA Weather</RouterLink>
      <nav aria-label="주요 메뉴">
        <RouterLink to="/">날씨</RouterLink>
        <RouterLink to="/about">서비스 소개</RouterLink>
      </nav>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 14px;
  border-bottom: 1px solid #d7dce2;
}

.brand {
  color: #1f4f78;
  font-size: 18px;
  font-weight: 800;
}

nav {
  display: flex;
  gap: 8px;
}

nav a {
  padding: 7px 10px;
  border-radius: 4px;
  color: #52616f;
  font-weight: 700;
}

nav a.router-link-exact-active {
  background: #e9f2f8;
  color: #1f4f78;
}

@media (max-width: 520px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
