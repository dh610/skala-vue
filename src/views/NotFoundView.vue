<template>
  <main class="not-found">
    <div class="badge" aria-hidden="true">🧭</div>
    <h1>페이지를 찾을 수 없습니다</h1>
    <p>주소가 바뀌었거나 존재하지 않는 경로입니다.</p>
    <RouterLink to="/"><ElButton type="primary">메인 대시보드로 돌아가기</ElButton></RouterLink>
  </main>
</template>

<style scoped>
.not-found {
  display: grid;
  justify-items: center;
  gap: 12px;
  padding: var(--s8) var(--s3);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper);
  box-shadow: var(--shadow-card);
  text-align: center;
}

.badge {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: var(--r-lg);
  background: var(--accent-bg);
  font-size: 30px;
}

h1 {
  margin: var(--s1) 0 0;
  font-size: 24px;
  font-weight: 800;
}

p {
  margin: 0 0 var(--s1);
  color: var(--ink-soft);
}

a:hover {
  text-decoration: none;
}
</style>
