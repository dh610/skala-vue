<script setup>
import { computed, defineAsyncComponent, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { challengeChapters, challenges, defaultChallengeId } from '../challenges/registry.js'

const route = useRoute()
const router = useRouter()

const activeChallenge = computed(
  () => challenges.find((challenge) => challenge.id === route.params.challengeId) ?? challenges[0],
)

const activeComponent = computed(() =>
  activeChallenge.value.loader ? defineAsyncComponent(activeChallenge.value.loader) : null,
)

/** 백틱으로 감싼 구간을 인라인 코드 칩으로 나눈다. (v-html 없이 안전하게 렌더링) */
function selectChallenge(challengeId) {
  router.push({ name: 'code-challenges', params: { challengeId } })
}

watchEffect(() => {
  if (!route.params.challengeId || !challenges.some(({ id }) => id === route.params.challengeId)) {
    router.replace({ name: 'code-challenges', params: { challengeId: defaultChallengeId } })
  }
})
</script>

<template>
  <main class="challenges-page">
    <div class="page-heading">
      <h1>Code Challenges</h1>
      <p>강의 중 실습한 예제와 Day별 제출 과제를 요구사항과 함께 모아 두었습니다.</p>
    </div>

    <div class="challenge-layout">
      <aside class="challenge-nav" aria-label="챌린지 목록">
        <section
          v-for="chapter in challengeChapters"
          :key="chapter.id"
          class="nav-group"
          :data-tone="chapter.tone"
        >
          <header class="nav-group__head">
            <span class="tone-dot" aria-hidden="true"></span>
            <h2>{{ chapter.title }}</h2>
            <small>{{ chapter.caption }}</small>
          </header>

          <ul>
            <li v-for="challenge in chapter.challenges" :key="challenge.id">
              <button
                type="button"
                class="nav-item"
                :class="{ 'is-active': challenge.id === activeChallenge.id }"
                :aria-current="challenge.id === activeChallenge.id ? 'true' : undefined"
                @click="selectChallenge(challenge.id)"
              >
                <span class="nav-item__title">{{ challenge.title }}</span>
                <span class="nav-item__subtitle">{{ challenge.subtitle }}</span>
              </button>
            </li>
          </ul>
        </section>
      </aside>

      <section class="challenge-content" :aria-label="activeChallenge.title">
        <header class="content-head" :data-tone="activeChallenge.chapterTone">
          <span class="chapter-chip">{{ activeChallenge.chapterTitle }}</span>
          <h2>{{ activeChallenge.title }}</h2>
          <p>{{ activeChallenge.subtitle }}</p>
        </header>

        <div v-if="activeChallenge.links" class="route-links">
          <RouterLink v-for="link in activeChallenge.links" :key="link.to" :to="link.to">
            <ElButton plain>{{ link.label }}</ElButton>
            <code>{{ link.to }}</code>
          </RouterLink>
        </div>

        <div v-if="activeComponent" class="demo-stage">
          <p class="demo-label">실습 화면</p>
          <Suspense>
            <component :is="activeComponent" :key="activeChallenge.id" />
            <template #fallback><ElSkeleton :rows="6" animated /></template>
          </Suspense>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.challenges-page {
  display: grid;
  gap: var(--s3);
}

.challenge-layout {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  align-items: start;
  gap: var(--s3);
}

/* ---------- 좌측 내비 ---------- */
.challenge-nav {
  position: sticky;
  top: var(--s2);
  display: grid;
  gap: var(--s3);
  max-height: calc(100vh - var(--s4));
  padding: var(--s2);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper);
  box-shadow: var(--shadow-card);
  overflow-y: auto;
}

.nav-group[data-tone='green'] {
  --tone: var(--accent);
  --tone-bg: var(--accent-bg);
  --tone-ink: var(--accent-dark);
}

.nav-group[data-tone='blue'] {
  --tone: var(--cool);
  --tone-bg: var(--cool-bg);
  --tone-ink: var(--cool);
}

.nav-group__head {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  column-gap: 7px;
  padding: 0 10px var(--s1);
}

.tone-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--tone);
}

.nav-group__head h2 {
  margin: 0;
  color: var(--ink);
  font-size: 14px;
  font-weight: 800;
}

.nav-group__head small {
  grid-column: 2;
  color: var(--muted);
  font-size: 11px;
}

.challenge-nav ul {
  display: grid;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav-item {
  display: grid;
  gap: 1px;
  width: 100%;
  min-height: 0;
  padding: 8px 10px;
  border: 0;
  border-radius: var(--r-md);
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.nav-item:hover {
  background: var(--canvas);
}

.nav-item.is-active {
  background: var(--tone-bg);
}

.nav-item__title {
  color: var(--ink-soft);
  font-size: 13.5px;
  font-weight: 700;
}

.nav-item.is-active .nav-item__title {
  color: var(--tone-ink);
}

.nav-item__subtitle {
  color: var(--muted);
  font-size: 11px;
  font-weight: 500;
}

/* ---------- 우측 콘텐츠 ---------- */
.challenge-content {
  display: grid;
  gap: var(--s2);
  min-width: 0;
  padding: var(--s3);
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  background: var(--paper);
  box-shadow: var(--shadow-card);
}

.content-head[data-tone='green'] {
  --tone-bg: var(--accent-bg);
  --tone-ink: var(--accent-dark);
}

.content-head[data-tone='blue'] {
  --tone-bg: var(--cool-bg);
  --tone-ink: var(--cool);
}

.content-head h2 {
  margin: 6px 0 0;
  color: var(--ink);
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.content-head p {
  margin: 2px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.chapter-chip {
  display: inline-block;
  padding: 3px 10px;
  border-radius: var(--pill);
  background: var(--tone-bg);
  color: var(--tone-ink);
  font-size: 11.5px;
  font-weight: 800;
}

/* ---------- 요구사항 ---------- */
/* ---------- 라우트 링크 ---------- */
.route-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--s1);
}

.route-links a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.route-links a:hover {
  text-decoration: none;
}

/* ---------- 데모 ---------- */
.demo-stage {
  padding: var(--s2);
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  background: var(--canvas);
}

.demo-label {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
}

@media (max-width: 900px) {
  .challenge-layout {
    grid-template-columns: 1fr;
  }

  .challenge-nav {
    position: static;
    max-height: none;
  }
}
</style>
