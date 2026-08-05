<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'
const items = ref([])
const textInput = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

async function handleRead() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.get(BASE_URL, { params: { _limit: 3 } })
    items.value = response.data
  } catch (error) {
    handleError('GET', error)
  } finally {
    isLoading.value = false
  }
}

async function handleCreate() {
  const title = textInput.value.trim()
  if (!title) return

  try {
    const response = await axios.post(BASE_URL, { title, body: '', userId: 1 })
    items.value.push({ ...response.data, id: Date.now() })
    textInput.value = ''
  } catch (error) {
    handleError('POST', error)
  }
}

async function handleUpdate(item) {
  const title = window.prompt('수정할 내용을 입력하세요.', item.title)?.trim()
  if (!title) return

  try {
    await axios.put(`${BASE_URL}/${Math.min(item.id, 100)}`, { ...item, title })
    item.title = title
  } catch (error) {
    handleError('PUT', error)
  }
}

async function handleDelete(item) {
  try {
    await axios.delete(`${BASE_URL}/${Math.min(item.id, 100)}`)
    items.value = items.value.filter((currentItem) => currentItem.id !== item.id)
  } catch (error) {
    handleError('DELETE', error)
  }
}

function handleError(method, error) {
  console.error(`${method} 요청 실패:`, error)
  errorMessage.value = `${method} 요청에 실패했습니다.`
}

onMounted(handleRead)
</script>

<template>
  <section class="practice-section">
    <h2>⚡ Axios CRUD 프로토타입 훈련</h2>

    <form class="create-form" @submit.prevent="handleCreate">
      <input v-model="textInput" placeholder="저장할 텍스트를 입력하세요" />
      <button class="create-button" type="submit">POST (추가)</button>
    </form>

    <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>
    <p v-if="isLoading" class="loading-message">데이터를 불러오는 중입니다.</p>

    <ul v-else class="item-list">
      <li v-for="item in items" :key="item.id">
        <div>
          <small>ID: {{ item.id }}</small>
          <p>{{ item.title }}</p>
        </div>
        <div class="item-actions">
          <button class="update-button" type="button" @click="handleUpdate(item)">
            PUT (수정)
          </button>
          <button class="delete-button" type="button" @click="handleDelete(item)">
            DEL (삭제)
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
h2 {
  margin: 0 0 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line);
  font-size: 20px;
  font-weight: 800;
}

.create-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
}

input {
  min-width: 0;
  min-height: 40px;
  padding: 8px 10px;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-sm);
  font-size: 15px;
}

button {
  min-height: 36px;
  padding: 6px 10px;
  border: 0;
  border-radius: var(--r-sm);
  color: var(--paper);
  font-weight: 700;
  cursor: pointer;
}

.create-button {
  background: var(--accent);
}

.update-button {
  background: var(--warn);
}

.delete-button {
  background: var(--danger);
}

.item-list {
  display: grid;
  gap: 10px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}

li {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  padding: 13px;
  border: 1px solid var(--line);
  border-radius: var(--r-sm);
  background: var(--canvas);
}

small {
  color: var(--ink-soft);
}

li p {
  margin: 4px 0 0;
  text-transform: capitalize;
}

.item-actions {
  display: flex;
  gap: 6px;
}

.loading-message {
  margin: 14px 0 0;
  color: var(--muted);
}

@media (max-width: 580px) {
  .create-form,
  li {
    grid-template-columns: 1fr;
  }

  .item-actions button {
    flex: 1;
  }
}
</style>
