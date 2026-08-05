<template>
  <main class="about-page">
    <div class="page-heading">
      <h1>서비스 소개</h1>
      <p>SKALA Vue 3 종합실습으로 만든 날씨 대시보드입니다.</p>
    </div>

    <section class="practice-section">
      <p class="lead">
        지역별 날씨를 검색하고 상세 기상관측 정보를 확인하는 Vue Router 실습 서비스입니다. 검색·필터
        ·전역 상태·페이지 전환까지 실습에서 다룬 기능을 실제 화면으로 확인할 수 있습니다.
      </p>

      <ul class="feature-list">
        <li><span aria-hidden="true">🔍</span> 한글 도시명 즉시 검색과 결과 필터링</li>
        <li><span aria-hidden="true">🌡</span> Pinia 전역 상태로 ℃ / ℉ 단위 전환</li>
        <li><span aria-hidden="true">🧭</span> 동적 라우팅으로 도시별 상세 페이지 이동</li>
        <li><span aria-hidden="true">🧪</span> 강의 예제와 과제를 모아둔 Code Challenges</li>
      </ul>

      <div class="controls">
        <RouterLink to="/"><ElButton type="primary">메인 대시보드로 이동</ElButton></RouterLink>
        <RouterLink to="/challenges"><ElButton plain>Code Challenges 보기</ElButton></RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  display: grid;
  gap: var(--s3);
}

.lead {
  margin: 0;
  color: var(--ink-soft);
}

.feature-list {
  display: grid;
  gap: 10px;
  margin: var(--s3) 0 0;
  padding: 0;
  list-style: none;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px var(--s2);
  border-radius: var(--r-md);
  background: var(--canvas);
  color: var(--ink-soft);
  font-size: 14px;
}

.controls a:hover {
  text-decoration: none;
}
</style>
