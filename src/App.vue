<script setup>
import UnitToggler from './components/exercise/UnitToggler.vue'
</script>

<template>
  <div class="app-shell">
    <header class="masthead">
      <RouterLink class="wordmark" to="/">
        <span class="wordmark__mark" aria-hidden="true"></span>
        <span class="wordmark__text"> SKALA <em>기상관측</em> </span>
      </RouterLink>

      <nav aria-label="주요 메뉴">
        <RouterLink to="/">날씨</RouterLink>
        <RouterLink to="/challenges">Code Challenges</RouterLink>
        <RouterLink to="/about">소개</RouterLink>
      </nav>

      <UnitToggler />
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.app-shell {
  display: grid;
  gap: var(--s5);
}

/* 마스트헤드: 종이 위 헤어라인 (참조의 sticky 헤어라인 장르는 공유, 배치·마크는 다르게) */
.masthead {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: var(--s3);
  padding: var(--s2) 0;
  border-bottom: 1px solid var(--line-strong);
  background: color-mix(in srgb, var(--canvas) 88%, transparent);
  backdrop-filter: blur(8px);
}

/* 워드마크: 오커 사각 마크 + "SKALA" + serif "기상관측" */
.wordmark {
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
  color: var(--ink);
}

.wordmark:hover {
  text-decoration: none;
}

.wordmark__mark {
  align-self: center;
  width: 12px;
  height: 12px;
  background: var(--accent);
}

.wordmark__text {
  font-size: 19px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.wordmark__text em {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 500;
  letter-spacing: 0;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s3);
  margin-left: auto;
}

nav a {
  position: relative;
  padding: 4px 0;
  color: var(--ink-soft);
  font-size: 14px;
  font-weight: 700;
}

nav a:hover {
  color: var(--ink);
  text-decoration: none;
}

/* 활성: 오커 언더라인 마커 (참조의 검정 언더라인과 색으로 구분) */
nav a.router-link-active {
  color: var(--ink);
}

nav a.router-link-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: var(--accent);
}

@media (max-width: 680px) {
  .masthead {
    flex-wrap: wrap;
    gap: var(--s2);
  }

  nav {
    order: 3;
    width: 100%;
    margin-left: 0;
  }
}
</style>
