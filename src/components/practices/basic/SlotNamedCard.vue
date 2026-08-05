<template>
  <article class="slot-card">
    <header>
      <slot name="header">
        <h3>기본 제목</h3>
      </slot>
    </header>
    <div class="body">
      <slot>
        <p>기본 본문 콘텐츠입니다.</p>
      </slot>
    </div>
  </article>
</template>

<style scoped>
.slot-card {
  overflow: hidden;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
  background: var(--paper);
}

header {
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
  background: var(--canvas-deep);
}

.body {
  min-height: 70px;
  padding: 16px;
}

:slotted(h3),
:slotted(p) {
  margin: 0;
}
</style>
