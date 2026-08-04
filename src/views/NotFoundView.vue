<template>
  <main class="not-found">
    <p>404</p>
    <h1>페이지를 찾을 수 없습니다</h1>
    <RouterLink to="/">메인 대시보드로 돌아가기</RouterLink>
  </main>
</template>

<style scoped>
.not-found {
  padding: 48px 20px;
  text-align: center;
}

p {
  margin: 0;
  color: #3973ac;
  font-size: 40px;
  font-weight: 800;
}

h1 {
  margin: 8px 0 20px;
  font-weight: 800;
}
</style>
