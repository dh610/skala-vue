<script setup>
import { useSlots } from 'vue'

defineProps({
  // header 슬롯을 쓰지 않을 때의 기본 제목
  title: {
    type: String,
    default: '',
  },
})

const slots = useSlots()
</script>

<template>
  <!--
    카드 안에 카드가 겹치지 않도록 배경 없는 '구획' 형태로 둔다.
    제목/푸터도 Named Slot으로 열어, 부모가 원하면 직접 구성할 수 있다.
  -->
  <section class="dashboard-card">
    <header class="dashboard-card__head">
      <slot name="header">
        <h2>{{ title }}</h2>
      </slot>
      <slot name="meta"></slot>
    </header>

    <slot></slot>

    <footer v-if="slots.footer" class="dashboard-card__foot">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<style scoped>
.dashboard-card {
  display: grid;
  gap: 12px;
}

.dashboard-card__head {
  display: flex;
  align-items: center;
  gap: var(--s1);
}

.dashboard-card__head h2 {
  margin: 0;
  color: var(--ink);
  font-size: 15px;
  font-weight: 800;
}

.dashboard-card__head h2::before {
  content: '';
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 8px;
  border-radius: 50%;
  background: var(--accent);
  vertical-align: middle;
}

.dashboard-card__foot {
  padding-top: 10px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 13px;
}
</style>
