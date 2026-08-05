<template>
  <article class="slot-card">
    <slot>
      <p class="fallback">부모가 콘텐츠를 전달하지 않아 기본 콘텐츠를 표시합니다.</p>
    </slot>
  </article>
</template>

<style scoped>
.slot-card {
  min-height: 74px;
  padding: 16px;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
  background: var(--paper);
}

.fallback {
  margin: 0;
  color: var(--ink-soft);
}
</style>
