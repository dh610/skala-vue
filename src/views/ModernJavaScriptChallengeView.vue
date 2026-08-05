<script setup>
import { computed, ref } from 'vue'

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

const runTask1 = () => {
  const members = ['김수원', '이서울', '박부산', '최대전']
  const rawData = {
    id: 101,
    grade: 'VIP',
    details: { score: 95 },
  }

  const memberContainsPark = members.includes('박부산')
  const {
    grade,
    details: { score },
  } = rawData

  result1.value = `부산 포함 여부 : ${memberContainsPark} / 등급 : ${grade} / 점수 : ${score}점`
}

const runTask2 = () => {
  const currentCart = ['Apple', 'Banana']
  const newProduct = { name: 'Orange', stock: 0, preview: null }

  const updatedCart = [...currentCart, newProduct.name]
  const imageStatus = newProduct?.preview ?? '이미지 준비중'
  const finalStock = newProduct.stock ?? 0

  result2.value = `카트 : ${updatedCart} / 이미지 : ${imageStatus} / 수량 : ${finalStock}개`
}

const fetchUserId = () => new Promise((resolve) => setTimeout(() => resolve({ uid: 777 }), 400))
const fetchUserProfile = (uid) =>
  new Promise((resolve) => setTimeout(() => resolve({ uid, nick: 'Graves' }), 400))

const runTask3 = async () => {
  isSyncing.value = true
  result3.value = '⏳데이터 동기화 중'

  try {
    const { uid } = await fetchUserId()
    const { nick } = await fetchUserProfile(uid)
    result3.value = `동기화 성공 : ${nick} 님 환영합니다.`
  } catch (error) {
    result3.value = '통신 실패'
  } finally {
    isSyncing.value = false
  }
}

const loadUserDirectory = async () => {
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

const missions = computed(() => [
  {
    id: 1,
    title: '과제 1. 데이터 추출 및 포맷팅',
    description: 'members.includes + 구조분해할당 + 템플릿 리터럴',
    result: result1.value || '미실행',
    loading: false,
    run: runTask1,
  },
  {
    id: 2,
    title: '과제 2. 불변성 복사 및 데이터 방어',
    description: '스프레드 + 옵셔널 체이닝 + 널 병합',
    result: result2.value || '미실행',
    loading: false,
    run: runTask2,
  },
  {
    id: 3,
    title: '과제 3. 비동기 연쇄 파이프라인',
    description: 'async/await + try-catch로 연쇄 호출',
    result: result3.value || '미실행',
    loading: isSyncing.value,
    run: runTask3,
  },
])

const runById = (id) => {
  if (id === 1) runTask1()
  if (id === 2) runTask2()
  if (id === 3) runTask3()
}
</script>

<template>
  <main class="modern-js-page">
    <section class="terminal-head">
      <h2>Modern JavaScript 챌린지</h2>
      <p>버튼을 눌러 과제를 실행하면 터미널 스타일 출력이 갱신됩니다.</p>
    </section>

    <div class="menu-wrap">
      <button
        v-for="menu in menuOptions"
        :key="menu.value"
        type="button"
        class="menu-btn"
        :class="{ active: activeMenu === menu.value }"
        @click="activeMenu = menu.value"
      >
        {{ menu.label }}
      </button>
    </div>

    <section v-if="activeMenu === 'missions'" class="terminal-grid">
      <article v-for="mission in missions" :key="mission.id" class="terminal-card">
        <h3>{{ mission.title }}</h3>
        <p>{{ mission.description }}</p>
        <button
          type="button"
          class="terminal-run-btn"
          :disabled="mission.loading && mission.id === 3"
          @click="runById(mission.id)"
        >
          {{ mission.id }}번 과제 가동
        </button>
        <pre class="terminal-result">결과창 {{ mission.id }}: {{ mission.result }}</pre>
      </article>
    </section>

    <section v-else class="terminal-card terminal-api">
      <h3>활용 API</h3>
      <p>JSONPlaceholder 사용자 데이터를 받아 가공해 보여줍니다.</p>
      <button type="button" class="terminal-run-btn" :disabled="isApiLoading" @click="loadUserDirectory">
        사용자 API 불러오기
      </button>
      <p class="api-status">{{ apiStatus }}</p>

      <ul v-if="apiUsers.length" class="api-list">
        <li v-for="user in apiUsers" :key="user.id">
          #{{ user.id }} / {{ user.name }} / {{ user.email }} / {{ user.city }} / {{ user.company }}
        </li>
      </ul>
      <p v-else class="api-empty">데이터를 받아오면 이 영역에 목록이 표시됩니다.</p>
    </section>
  </main>
</template>

<style scoped>
.modern-js-page {
  display: grid;
  gap: var(--s2);
  max-width: 960px;
}

.terminal-head h2 {
  margin: 0;
}

.terminal-head p {
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.menu-wrap {
  display: inline-flex;
  gap: 8px;
}

.menu-btn {
  min-height: 0;
  border-radius: var(--r-sm);
  padding: 6px 12px;
  color: var(--ink-soft);
  background: var(--paper);
  font-size: 13px;
}

.menu-btn.active {
  color: var(--ink);
  font-weight: 700;
  border-color: var(--line-strong);
}

.terminal-grid {
  display: grid;
  gap: var(--s2);
}

.terminal-card {
  border: 1px solid var(--line);
  border-radius: var(--r-md);
  padding: 0.95rem;
  background: var(--paper);
  color: var(--ink);
}

.terminal-card h3 {
  margin: 0;
  color: var(--ink);
}

.terminal-card p {
  margin: 0.25rem 0 0.85rem;
  color: var(--muted);
}

.terminal-run-btn {
  margin-bottom: 0.75rem;
}

.terminal-run-btn:hover:not(:disabled) {
  opacity: 0.95;
}

.terminal-run-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.terminal-result {
  margin: 0;
  padding: 0.65rem;
  border: 1px dashed #334155;
  border-radius: var(--r-sm);
  min-height: 2.6rem;
  background: #020617;
  color: #67e8f9;
  font-size: 12px;
  line-height: 1.45;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: var(--font-mono);
}

.api-status {
  margin: 0.6rem 0 0.8rem;
  color: var(--ink-soft);
  font-size: 13px;
  font-family: var(--font-sans);
}

.api-empty {
  margin: 0;
  color: var(--muted);
}

.api-list {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--ink-soft);
  display: grid;
  gap: 6px;
  font-size: 13px;
  font-family: var(--font-sans);
}

.api-list li {
  padding-left: 4px;
}
</style>
