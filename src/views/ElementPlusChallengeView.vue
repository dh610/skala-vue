<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const userForm = ref({
  email: '',
  agree: false,
})
const productQuantity = ref(1)
const productRate = ref(4)
const downloadProgress = ref(0)
const isDownloading = ref(false)
let downloadTimer = null

function handleRegister() {
  if (!userForm.value.email.includes('@')) {
    ElMessage.error('올바른 이메일 형식이 아닙니다.')
    return
  }

  if (!userForm.value.agree) {
    ElMessage.warning('이용약관에 동의하셔야 합니다.')
    return
  }

  ElMessage.success('가입 신청이 정상적으로 완료되었습니다!')
}

async function confirmDelete() {
  try {
    await ElMessageBox.confirm('서버에서 해당 파일을 영구히 삭제하시겠습니까?', '최종 경고', {
      confirmButtonText: '네, 삭제합니다',
      cancelButtonText: '취소',
      type: 'danger',
    })
    ElMessage.success('파일이 안전하게 파쇄되었습니다.')
  } catch {
    ElMessage.info('삭제 작업이 취소되었습니다.')
  }
}

function startDownload() {
  if (isDownloading.value) return

  isDownloading.value = true
  downloadProgress.value = 0
  downloadTimer = window.setInterval(() => {
    downloadProgress.value += 20

    if (downloadProgress.value >= 100) {
      window.clearInterval(downloadTimer)
      downloadTimer = null
      isDownloading.value = false
      ElMessage.success('대용량 데이터 로드가 완료되었습니다!')
    }
  }, 400)
}

onBeforeUnmount(() => {
  if (downloadTimer) window.clearInterval(downloadTimer)
})
</script>

<template>
  <main class="challenge-page">
    <h1>Element Plus Code Challenge</h1>

    <ElCard shadow="never">
      <template #header><strong>실습 1. 회원가입 Form & 입력 제어</strong></template>
      <ElForm label-width="130px" @submit.prevent="handleRegister">
        <ElFormItem label="이메일 주소">
          <ElInput v-model="userForm.email" placeholder="example@email.com" />
        </ElFormItem>
        <ElFormItem label="이용약관 동의">
          <ElSwitch v-model="userForm.agree" />
          <span class="control-description">개인정보 수집 및 필수 이용약관에 동의합니다.</span>
        </ElFormItem>
        <ElButton class="full-button" type="success" native-type="submit">회원가입하기</ElButton>
      </ElForm>
    </ElCard>

    <ElCard shadow="never">
      <template #header><strong>실습 2. 커머스 상품 수량 및 평점 시스템</strong></template>
      <div class="commerce-row">
        <span>구매 수량 선택:</span>
        <ElInputNumber v-model="productQuantity" :min="1" :max="10" />
        <span class="hint">최대 10개 구매 가능</span>
      </div>
      <div class="commerce-row">
        <span>상품 만족도 별점:</span>
        <ElRate v-model="productRate" />
        <strong>{{ productRate }}점</strong>
      </div>
      <ElAlert
        :closable="false"
        type="success"
        :title="`실시간 장바구니 요약: 선택 수량 ${productQuantity}개 / 내가 준 점수 ${productRate}점`"
      />
    </ElCard>

    <ElCard shadow="never">
      <template #header><strong>실습 3. 시스템 피드백 & 프로그래스 인터랙션</strong></template>
      <div class="feedback-actions">
        <ElButton type="danger" plain @click="confirmDelete">서버 파일 삭제 테스트</ElButton>
        <ElButton type="primary" :loading="isDownloading" @click="startDownload">
          데이터 동기화 시작
        </ElButton>
      </div>
      <ElProgress :percentage="downloadProgress" :status="downloadProgress === 100 ? 'success' : ''" />
    </ElCard>
  </main>
</template>

<style scoped>
.challenge-page {
  display: grid;
  gap: 18px;
}

h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
}

.control-description {
  margin-left: 10px;
  color: #52616f;
}

.full-button {
  width: 100%;
}

.commerce-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.commerce-row > span:first-child {
  width: 130px;
  flex: 0 0 auto;
}

.hint {
  color: #6b7785;
}

.feedback-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 22px;
}

@media (max-width: 580px) {
  .commerce-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  .commerce-row > span:first-child {
    width: auto;
  }

  .feedback-actions {
    flex-direction: column;
  }
}
</style>
