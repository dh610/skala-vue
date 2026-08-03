<script setup>
import SlotDefaultCard from './SlotDefaultCard.vue'
import SlotNamedCard from './SlotNamedCard.vue'
import SlotScopedCard from './SlotScopedCard.vue'
</script>

<template>
  <main class="challenge-page">
    <header class="page-header">
      <p>Vue Component Slot</p>
      <h1>157페이지 Slot Challenge</h1>
    </header>

    <section class="practice-section">
      <div class="section-heading">
        <span>01</span>
        <h2>Default Slot</h2>
      </div>
      <div class="example-grid">
        <div>
          <p class="example-label">부모 콘텐츠 주입</p>
          <SlotDefaultCard>
            <p class="injected-copy">부모에서 전달한 단순 텍스트 콘텐츠입니다.</p>
          </SlotDefaultCard>
        </div>
        <div>
          <p class="example-label">Fallback 콘텐츠</p>
          <SlotDefaultCard />
        </div>
      </div>
    </section>

    <section class="practice-section">
      <div class="section-heading">
        <span>02</span>
        <h2>Named Slot</h2>
      </div>
      <SlotNamedCard>
        <template #header>
          <h3>부모가 주입한 Named Slot 제목</h3>
        </template>
        <p>이 문장은 이름 없는 기본 슬롯을 통해 본문 영역에 배치됩니다.</p>
      </SlotNamedCard>
    </section>

    <section class="practice-section">
      <div class="section-heading">
        <span>03</span>
        <h2>Scoped Slot</h2>
      </div>
      <div class="example-grid">
        <div>
          <p class="example-label">자식 데이터를 부모 마크업으로 표현</p>
          <SlotScopedCard v-slot="slotData">
            <div class="status-display">
              <p>알림 메시지: <strong>{{ slotData.text }}</strong></p>
              <p>접속자 수: <strong>{{ slotData.count }}명</strong></p>
            </div>
          </SlotScopedCard>
        </div>
        <div>
          <p class="example-label">Scoped Slot Fallback</p>
          <SlotScopedCard />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.challenge-page {
  display: grid;
  gap: 16px;
  width: min(100%, 880px);
  margin: 0 auto;
  color: #202830;
}

.page-header p {
  margin: 0 0 4px;
  color: #52616f;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: 28px;
}

.practice-section {
  padding: 18px;
  border: 1px solid #d7dce2;
  border-radius: 8px;
  background: #f8fafb;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}

.section-heading span {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: #168a65;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}

h2,
h3,
p {
  margin-top: 0;
}

h2 {
  margin-bottom: 0;
  font-size: 19px;
}

h3 {
  margin-bottom: 0;
  font-size: 17px;
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.example-label {
  margin-bottom: 6px;
  color: #52616f;
  font-size: 12px;
  font-weight: 700;
}

.injected-copy {
  margin: 0;
  font-weight: 700;
}

.status-display {
  padding: 12px;
  border-left: 4px solid #168a65;
  background: #effaf6;
}

.status-display p {
  margin-bottom: 6px;
}

.status-display p:last-child {
  margin-bottom: 0;
}

@media (max-width: 620px) {
  .example-grid {
    grid-template-columns: 1fr;
  }
}
</style>
