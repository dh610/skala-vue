// Element Plus 기본 CSS를 먼저 불러오고, 우리 토큰/오버라이드(main.css)를 뒤에 둬서
// --el-* 변수 오버라이드가 항상 이기도록 한다.
import 'element-plus/dist/index.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
