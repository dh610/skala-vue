<script setup>
import { ref } from 'vue'

const result1 = ref('')
const result2 = ref('')
const result3 = ref('')
const isSyncing = ref(false)
const activeMenu = ref('missions')
const apiUsers = ref([])
const apiStatus = ref('아직 불러온 데이터가 없습니다.')
const isApiLoading = ref(false)

const menuOptions = [
  { label: '기본 미션', value: 'missions' },
  { label: '활용 API', value: 'api' },
]

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

async function loadUserDirectory() {
  isApiLoading.value = true
  apiStatus.value = '사용자 데이터를 불러오는 중...'

  try {
    const response = await window.fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const users = await response.json()
    apiUsers.value = users.slice(0, 5).map(({ id, name, email, address, company }) => ({
      id,
      name,
      email,
      city: address?.city ?? '등록된 주소 없음',
      company: company?.name ?? '소속 없음',
    }))
    apiStatus.value = `${apiUsers.value.length}명의 사용자 정보를 가공했습니다.`
  } catch (error) {
    console.error('사용자 API 요청 실패:', error)
    apiStatus.value = '사용자 데이터를 불러오지 못했습니다.'
  } finally {
    isApiLoading.value = false
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
    <ElSegmented v-model="activeMenu" :options="menuOptions" />

    <template v-if="activeMenu === 'missions'">
      <ElCard v-for="mission in missions" :key="mission.id" shadow="never">
        <template #header
          ><strong>{{ mission.title }}</strong></template
        >
        <ElButton type="primary" @click="mission.run">{{ mission.button }}</ElButton>
        <div class="console">결과창 {{ mission.id }}: {{ mission.result.value }}</div>
      </ElCard>

      <ElCard shadow="never">
        <template #header><strong>과제 3. 비동기 연쇄 파이프라인 (Async/Await)</strong></template>
        <ElButton type="primary" :loading="isSyncing" @click="runTask3">과제 3 가동</ElButton>
        <div class="console">결과창 3: {{ result3 }}</div>
      </ElCard>
    </template>

    <ElCard v-else shadow="never">
      <template #header><strong>확장 과제. 사용자 API 데이터 가공</strong></template>
      <ElButton type="primary" :loading="isApiLoading" @click="loadUserDirectory">
        사용자 API 불러오기
      </ElButton>
      <ElAlert class="api-status" :title="apiStatus" type="info" :closable="false" />

      <ElTable v-if="apiUsers.length" :data="apiUsers" stripe>
        <ElTableColumn prop="id" label="ID" width="64" />
        <ElTableColumn prop="name" label="이름" min-width="130" />
        <ElTableColumn prop="email" label="이메일" min-width="190" />
        <ElTableColumn prop="city" label="도시" min-width="120" />
        <ElTableColumn prop="company" label="소속" min-width="160" />
      </ElTable>
      <ElEmpty v-else description="API 버튼을 눌러 사용자 정보를 불러오세요." />
    </ElCard>
  </main>
</template>

<style scoped>
h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
}

.api-status {
  margin: 14px 0;
}
</style>
