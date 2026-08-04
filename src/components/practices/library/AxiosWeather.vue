<script setup>
import { ref } from 'vue'
import axios from 'axios'

const weatherData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

async function handleFetchWeather() {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

  if (!apiKey) {
    errorMessage.value = '.env 파일에 VITE_OPENWEATHER_API_KEY를 설정해 주세요.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: 35.158582,
        lon: 126.804975,
        appid: apiKey,
        units: 'metric',
        lang: 'kr',
      },
    })

    weatherData.value = response.data
  } catch (error) {
    console.error('날씨 데이터 요청 실패:', error)
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      errorMessage.value = 'OpenWeather가 API 키를 유효하지 않은 키로 거부했습니다. 발급 상태를 확인해 주세요.'
    } else {
      errorMessage.value = '데이터를 가져오지 못했습니다. 네트워크 상태를 확인해 주세요.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="practice-section">
    <h2>⚡ Axios 통신 검증</h2>
    <button type="button" :disabled="isLoading" @click="handleFetchWeather">
      {{ isLoading ? '데이터 로딩 중...' : '실시간 날씨 데이터 당겨오기' }}
    </button>

    <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>

    <div v-if="weatherData" class="result-card">
      <p>📍 위치: <strong>{{ weatherData.name }}</strong></p>
      <p>🌡 현재 기온: <strong>{{ weatherData.main.temp }}°C</strong> (정상 섭씨 변환 완료)</p>
      <p>☁️ 날씨 상태: <strong>{{ weatherData.weather[0].description }}</strong></p>
      <p>💧 습도: <strong>{{ weatherData.main.humidity }}%</strong></p>
    </div>
    <p v-else-if="!errorMessage" class="empty-message">
      아직 가져온 데이터가 없습니다. 버튼을 눌러 통신을 가동하세요.
    </p>
  </section>
</template>

<style scoped>
.practice-section {
  padding: 20px;
  border: 1px solid #d7dce2;
  border-radius: 8px;
  background: #fff;
}

h2 {
  margin: 0 0 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #d7dce2;
  font-size: 20px;
  font-weight: 800;
}

button {
  min-height: 38px;
  padding: 7px 12px;
  border: 1px solid #929da8;
  border-radius: 4px;
  background: #f7f8fa;
  color: #202830;
  cursor: pointer;
}

button:disabled {
  cursor: wait;
  opacity: 0.65;
}

.result-card {
  margin-top: 14px;
  padding: 14px;
  border: 1px solid #d7dce2;
  border-radius: 6px;
  background: #f6f7f9;
}

.result-card p {
  margin: 5px 0;
}

.empty-message,
.error-message {
  margin: 14px 0 0;
}

.empty-message {
  color: #52616f;
}

.error-message {
  color: #a13c28;
  font-weight: 700;
}
</style>
