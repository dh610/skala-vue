import { createRouter, createWebHistory } from 'vue-router'
import WeatherHomeView from '../views/WeatherHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'weather-home',
      component: WeatherHomeView,
      // 상세는 홈 위에 라우트로 구동되는 모달로 뜬다.
      // router.push + :cityId 동적 매칭(과제 4)은 그대로 유지하면서 홈은 뒤에 계속 마운트된다.
      children: [
        {
          path: 'weather/:cityId',
          name: 'weather-detail',
          component: () => import('../views/WeatherDetailView.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'weather-about',
      component: () => import('../views/WeatherAboutView.vue'),
    },
    {
      path: '/challenges/:challengeId?',
      name: 'code-challenges',
      component: () => import('../views/CodeChallengesView.vue'),
    },
    // 아래 실습들은 Code Challenges 안으로 통합됨. 기존 주소는 리다이렉트로 유지한다.
    { path: '/counter', redirect: '/challenges/pinia-counter' },
    { path: '/axios', redirect: '/challenges/axios' },
    { path: '/element-plus', redirect: '/challenges/element-plus' },
    { path: '/modern-js', redirect: '/challenges/modern-js' },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
