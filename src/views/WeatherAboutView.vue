<template>
  <main class="about-page">
    <p>SKALA Weather</p>
    <h1>서비스 소개</h1>
    <p class="description">
      지역별 날씨를 검색하고 상세 기상관측 정보를 확인하는 Vue Router 실습 서비스입니다.
    </p>
    <RouterLink to="/">메인 대시보드로 돌아가기</RouterLink>
  </main>
</template>

<style scoped>
.about-page {
  padding: 24px;
  border-left: 4px solid #3973ac;
  background: #f3f6f8;
}

p,
h1 {
  margin-top: 0;
}

h1 {
  font-weight: 800;
}

.description {
  margin-bottom: 20px;
  color: #52616f;
}
</style>
