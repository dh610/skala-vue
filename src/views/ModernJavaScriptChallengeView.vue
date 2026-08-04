<script setup>
import { ref } from 'vue'

const result1 = ref('')
const result2 = ref('')
const result3 = ref('')
const isSyncing = ref(false)

function runTask1() {
  const members = ['김수원', '이서울', '박부산', '최대전']
  const rawData = { id: 101, grade: 'VIP', details: { score: 95 } }

  const memberContainsPark = members.includes('박부산')
  const {
    grade,
    details: { score },
  } = rawData

  result1.value = `부산 포함 여부: ${memberContainsPark} / 등급: ${grade} / 점수: ${score}점`
}

function runTask2() {
  const currentCart = ['Apple', 'Banana']
  const newProduct = { name: 'Orange', stock: 0, preview: null }

  const updatedCart = [...currentCart, newProduct.name]
  const imageStatus = newProduct.preview?.url ?? '이미지 준비중'
  const finalStock = newProduct.stock ?? 0

  result2.value = `카트: ${updatedCart.join(',')} / 이미지: ${imageStatus} / 수량: ${finalStock}개`
}

const fetchUserId = () => new Promise((resolve) => setTimeout(() => resolve({ uid: 777 }), 400))
const fetchUserProfile = (uid) =>
  new Promise((resolve) => setTimeout(() => resolve({ uid, nick: 'Graves' }), 400))

async function runTask3() {
  isSyncing.value = true
  result3.value = '데이터 동기화 중...'

  try {
    const { uid } = await fetchUserId()
    const { nick } = await fetchUserProfile(uid)
    result3.value = `동기화 성공: ${nick}님 환영합니다.`
  } catch {
    result3.value = '통신 실패'
  } finally {
    isSyncing.value = false
  }
}

const missions = [
  {
    id: 1,
    title: '과제 1. 데이터 추출 및 포맷팅',
    button: '과제 1 가동',
    run: runTask1,
    result: result1,
  },
  {
    id: 2,
    title: '과제 2. 불변성 복사 및 데이터 방어',
    button: '과제 2 가동',
    run: runTask2,
    result: result2,
  },
]
</script>

<template>
  <main class="quiz-container">
    <h1>Modern JavaScript Code Challenge</h1>

    <ElCard v-for="mission in missions" :key="mission.id" shadow="never">
      <template #header><strong>{{ mission.title }}</strong></template>
      <ElButton type="primary" @click="mission.run">{{ mission.button }}</ElButton>
      <div class="console">결과창 {{ mission.id }}: {{ mission.result.value }}</div>
    </ElCard>

    <ElCard shadow="never">
      <template #header><strong>과제 3. 비동기 연쇄 파이프라인 (Async/Await)</strong></template>
      <ElButton type="primary" :loading="isSyncing" @click="runTask3">과제 3 가동</ElButton>
      <div class="console">결과창 3: {{ result3 }}</div>
    </ElCard>
  </main>
</template>

<style scoped>
.quiz-container {
  display: grid;
  gap: 18px;
}

h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
}

.console {
  min-height: 52px;
  margin-top: 14px;
  padding: 14px;
  border-radius: 4px;
  background: #282828;
  color: #7ed957;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  overflow-wrap: anywhere;
}
</style>
