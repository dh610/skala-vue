<script setup>
import { reactive, ref } from 'vue'

const count = ref(0)
const name = ref('홍길동')
const isActive = ref(true)
const items = ref(['사과', '배'])
const user = ref({ name: '이순신', age: 30 })

const userReactive = reactive({ name: '이순신', age: 30 })
const reactiveItems = reactive(['사과', '바나나'])

function increaseRef() {
  count.value++
}

function changeUserName() {
  user.value.name = '장보고'
}

function addRefItem() {
  items.value.push(`과일 ${items.value.length + 1}`)
}

function celebrateReactive() {
  userReactive.age++
}

function addReactiveItem() {
  reactiveItems.push(`과일 ${reactiveItems.length + 1}`)
}

function removeReactiveItem(index) {
  reactiveItems.splice(index, 1)
}
</script>

<template>
  <main class="challenge-page">
    <section class="practice-section">
      <h2>반응형 상태 ref() 기초</h2>

      <p>
        Ref 카운트: <strong>{{ count }}</strong>
      </p>
      <label>
        이름:
        <input v-model="name" type="text" />
      </label>
      <p>입력한 이름: {{ name }}</p>
      <p>활성 상태: {{ isActive ? '활성' : '비활성' }}</p>
      <p>과일 목록: {{ items.join(', ') }}</p>
      <p>사용자 정보: 이름 - {{ user.name }}, 나이 - {{ user.age }}</p>

      <div class="button-row">
        <button type="button" @click="increaseRef">Ref 변수 증가</button>
        <button type="button" @click="isActive = !isActive">토글</button>
        <button type="button" @click="addRefItem">과일 추가</button>
        <button type="button" @click="changeUserName">사용자 이름 변경</button>
      </div>
    </section>

    <section class="practice-section">
      <h2>반응형 상태 reactive() 특징 및 주의점</h2>

      <h3>1) 객체(Object) reactive</h3>
      <p>이름: {{ userReactive.name }} / 나이: {{ userReactive.age }}세</p>
      <button type="button" @click="celebrateReactive">reactive 나이 한 살 추가</button>

      <h3>2) 배열(Array) reactive</h3>
      <ul>
        <li v-for="(item, index) in reactiveItems" :key="`${item}-${index}`">
          <span>{{ item }}</span>
          <button type="button" class="remove-button" @click="removeReactiveItem(index)">
            삭제
          </button>
        </li>
      </ul>
      <button type="button" @click="addReactiveItem">과일 항목 추가</button>
    </section>
  </main>
</template>

<style scoped>
h1,
h2,
h3 {
  color: var(--ink);
}

h1 {
  margin: 0;
  font-size: 28px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin: 20px 0 8px;
  font-size: 16px;
}

input {
  width: min(100%, 240px);
  margin-left: 8px;
  padding: 6px 8px;
  border: 1px solid var(--muted);
  border-radius: var(--r-sm);
}

button {
  min-height: 34px;
  padding: 6px 10px;
  border: 1px solid var(--muted);
  border-radius: var(--r-sm);
  background: var(--canvas);
  color: var(--ink);
  cursor: pointer;
}

button:hover {
  background: var(--line);
}

ul {
  padding-left: 24px;
}

li {
  margin: 7px 0;
}

.remove-button {
  min-height: 28px;
  margin-left: 8px;
  padding: 2px 8px;
}
</style>
