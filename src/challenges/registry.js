/**
 * Code Challenges 레지스트리
 *
 * - requirements: 강의 PDF의 Code Challenge / 과제 요구사항을 그대로 옮긴 체크리스트.
 *   문자열 안의 `백틱`은 화면에서 인라인 코드 칩으로 렌더링된다.
 * - loader: 화면에서 바로 돌려볼 데모 컴포넌트 (지연 로딩)
 * - links: 데모 컴포넌트 대신 사이트의 실제 화면으로 보내는 항목 (결과물이 사이트 자체인 과제)
 */
export const challengeChapters = [
  {
    id: 'code-challenge',
    title: 'Code Challenge',
    caption: '강의 중 예제',
    tone: 'green',
    challenges: [
      {
        id: 'intro',
        title: '학습환경 구성',
        subtitle: '반응성 · 텍스트 보간',
        requirements: [
          '반응성 데이터 (Reactivity) Example',
          'JavaScript in Text Interpolation Example',
        ],
        loader: () => import('../components/practices/basic/IntroChallenge.vue'),
      },
      {
        id: 'reactive-state',
        title: '반응형 상태',
        subtitle: 'ref, reactive',
        requirements: ['`ref()` Example', '`reactive()` Example'],
        loader: () => import('../components/practices/basic/ReactiveStateChallenge.vue'),
      },
      {
        id: 'directives',
        title: '디렉티브',
        subtitle: 'v-html, v-bind, v-if, v-for',
        requirements: [
          '`v-html` / `v-html` XSS / `v-text`',
          '`v-bind` (Basic, Class Binding, Style Binding, Shorthand)',
          '`v-if` / `v-else-if` / `v-else` / `v-show`',
          '`v-for` (배열, 객체, 배열 내 객체)',
          '`v-pre` / `v-cloak` / `v-once` / `v-memo`',
        ],
        loader: () => import('../components/practices/basic/DirectiveChallenge.vue'),
      },
      {
        id: 'events',
        title: '이벤트 처리',
        subtitle: 'v-on, 이벤트 객체, 수식어',
        requirements: [
          '`v-on` Event Handler Example',
          'Event Object Example',
          'Event Modifier Example (`.prevent` `.stop` `.once` `.enter`)',
        ],
        loader: () => import('../components/practices/basic/EventChallenge.vue'),
      },
      {
        id: 'form-model',
        title: 'v-model과 Modifiers',
        subtitle: '양방향 바인딩, 수식어',
        requirements: [
          '`v-model` 양방향 데이터 바인딩',
          'HTML Form 요소와 `v-model` 매핑',
          '`v-model` Modifiers (`.lazy` `.number` `.trim`)',
          'Vue Style Example',
        ],
        loader: () => import('../components/practices/basic/WeatherChallenge.vue'),
      },
      {
        id: 'computed-watch',
        title: 'Computed와 Watch',
        subtitle: 'computed, watch, watchEffect',
        requirements: [
          '`computed()` Example (캐싱 동작 확인)',
          '`watch()` Example',
          '`watch()` Multi-Source Watch',
          '`watch()` Deep Watch',
          '`watch()` reactive 반응형 데이터',
          '`watchEffect()` Example',
        ],
        loader: () => import('../components/practices/basic/ComputedWatchChallenge.vue'),
      },
      {
        id: 'lifecycle',
        title: 'Lifecycle Hooks',
        subtitle: 'onMounted, onUnmounted',
        requirements: ['Lifecycle Hook Example (마운트 / 언마운트 시점 추적)'],
        loader: () => import('../components/practices/basic/LifecycleChallenge.vue'),
      },
      {
        id: 'props-emits',
        title: 'Props & Emits',
        subtitle: '부모-자식 데이터 흐름',
        requirements: ['Props & Emits Example (`defineProps` / `defineEmits`)'],
        loader: () => import('../components/practices/basic/PropsEmitsChallenge.vue'),
      },
      {
        id: 'slots',
        title: 'Slots',
        subtitle: 'Default, Named, Scoped',
        requirements: ['Default Slot Example', 'Named Slot Example', 'Scoped Slot Example'],
        loader: () => import('../components/practices/basic/SlotChallenge.vue'),
      },
      {
        id: 'pinia-counter',
        title: 'Pinia Counter',
        subtitle: '전역 상태 관리',
        requirements: [
          'Pinia 등록하기 (`src/main.js`)',
          'Store 생성하기 (`src/stores/counter.js`)',
          'Store 사용하기 (`StoreCounter.vue`)',
          'Vue Devtools에서 Pinia 확인',
        ],
        loader: () => import('../components/practices/library/StoreCounter.vue'),
      },
      {
        id: 'axios',
        title: 'Axios',
        subtitle: 'REST API 통신',
        requirements: [
          'Axios 설치',
          'OpenWeather API 가입 및 키 발급',
          'Axios Weather Example (실시간 관측 데이터)',
          'Axios JSON Example (GET / POST / PUT / DELETE)',
        ],
        loader: () => import('../views/AxiosChallengeView.vue'),
      },
      {
        id: 'element-plus',
        title: 'Element Plus',
        subtitle: 'UI 라이브러리 컴포넌트',
        requirements: [
          '`userForm` Object와 Validation — `el-card` `el-input` `el-switch` `el-button`',
          '구매 수량과 별점 — `el-input-number` `el-rate`',
          '파일삭제 Confirm과 진행률 — `ElMessageBox` `el-progress`',
        ],
        loader: () => import('../views/ElementPlusChallengeView.vue'),
      },
      {
        id: 'modern-js',
        title: 'Modern JavaScript',
        subtitle: 'ES6+ 문법 미션',
        requirements: [
          '과제 1 — `includes()`, 비구조화 할당, 템플릿 리터럴',
          '과제 2 — 스프레드 연산자, 옵셔널 체이닝 `?.`, 널 병합 `??`',
          '과제 3 — `async` / `await` 연쇄 호출과 `try-catch` 에러 제어',
        ],
        loader: () => import('../views/ModernJavaScriptChallengeView.vue'),
      },
    ],
  },
  {
    id: 'assignment',
    title: '실습 과제',
    caption: 'Day별 제출 과제',
    tone: 'blue',
    challenges: [
      {
        id: 'assignment-composition',
        title: '과제 2. 날씨 (컴포지션)',
        subtitle: 'Composition API',
        requirements: [
          '반응형 상태 관리 — `searchQuery`, `selectedCityInfo`, `weatherList`',
          '검색 도시 필터링 — `computed`로 `filteredWeatherList` 구성',
          '`selectedCityInfo` 감시 (`watch`) — 상태바 변경 시 콘솔로그',
          '`searchQuery` 감시 (`watchEffect`) — 타이핑마다 콘솔로그',
          '검색 결과 3분기 — 원본 / 일치 / 결과 없음 안내',
        ],
        hint: '동작 로그는 브라우저 콘솔에서 확인할 수 있습니다.',
        loader: () => import('../components/practices/basic/WeatherCompositionAssignment.vue'),
      },
      {
        id: 'assignment-components',
        title: '과제 3. 날씨 (컴포넌트)',
        subtitle: '컴포넌트 분리',
        requirements: [
          '기능 변경 없이 4개 컴포넌트로 분리',
          '`WeatherParent.vue` — 모든 반응형 데이터 유지',
          '`BaseDashboardCard.vue` — 공통 디자인과 `<slot>` 배치',
          '`SearchBar.vue` — props 수신, `update-query` emit',
          '`WeatherCard.vue` — props 수신, `select-card` / `click-detail` emit',
          '각 컴포넌트 디자인은 `<style scoped>`로 분리',
        ],
        loader: () => import('../components/practices/basic/WeatherParent.vue'),
      },
      {
        id: 'assignment-router',
        title: '과제 4. Router 활용',
        subtitle: 'Vue Router',
        requirements: [
          '라우터 지연 로딩과 Catch-all Route 적용',
          '`App.vue` — `RouterLink` 내비게이션 바와 `RouterView` 배치',
          '`WeatherHomeView.vue` — `WeatherParent` 대체',
          '상세보기 클릭 시 `router.push()` 프로그래매틱 이동',
          '`WeatherDetailView.vue` — `:cityId` 동적 매칭',
          '`NotFoundView.vue` — 정의되지 않은 경로 처리',
        ],
        hint: '이 과제의 결과물은 사이트 전체입니다. 아래 링크로 각 라우트를 확인해 보세요.',
        links: [
          { label: '홈 대시보드', to: '/' },
          { label: '서울 상세', to: '/weather/city-01' },
          { label: '없는 도시', to: '/weather/city-99' },
          { label: '404 확인', to: '/no-such-page' },
        ],
      },
      {
        id: 'assignment-store',
        title: '과제 5. Store 활용',
        subtitle: 'Pinia 전역 상태',
        requirements: [
          '`configStore.js` — state: `unit` (초기값 celsius)',
          'getters: `unitSymbol` (℃ / ℉)',
          'actions: `toggleUnit` — celsius와 fahrenheit 토글',
          '`UnitToggler.vue`를 내비게이션 바 옆에 배치',
          '메인과 상세 날씨에 단위 설정 변경 적용',
        ],
        hint: '원본 데이터는 섭씨로 유지하고 표시할 때만 변환합니다. 상단 ℃ / ℉ 토글을 눌러 보세요.',
        links: [
          { label: '홈에서 단위 확인', to: '/' },
          { label: '상세에서 단위 확인', to: '/weather/city-01' },
        ],
      },
      {
        id: 'assignment-axios',
        title: '과제 6. 날씨 데이터 연동',
        subtitle: 'Axios와 OpenWeather',
        requirements: [
          'Axios 라이브러리 설치',
          'OpenWeatherMap API 가입 및 Key 발급',
          'API 키는 `.env`로 관리 (공개 저장소 커밋 금지)',
          '`try` / `catch` / `finally`와 로딩 상태 처리',
        ],
        hint: '`.env`에 `VITE_OPENWEATHER_API_KEY`를 설정하면 실시간 데이터가 표시됩니다.',
        loader: () => import('../components/practices/library/AxiosWeather.vue'),
      },
      {
        id: 'assignment-element-plus',
        title: '과제 7. Element Plus 적용',
        subtitle: 'UI 라이브러리 전환',
        requirements: [
          '검색 입력 — `input` → `el-input` (clearable)',
          '온도 칩 — 자작 칩 → `el-tag`',
          '버튼 — 자작 버튼 → `el-button`',
          '빈 결과 — 안내 문구 → `el-empty`',
          '기능은 3일차와 동일하고 부품만 라이브러리로 교체',
        ],
        hint: '메인 대시보드가 이 과제의 결과물입니다.',
        links: [{ label: '메인 대시보드에서 확인', to: '/' }],
      },
      {
        id: 'assignment-modern-js',
        title: '과제 8. Modern JS 확장',
        subtitle: '메뉴와 API 확장',
        requirements: [
          '메뉴를 추가하고 활용 API를 추가해서 과제를 확장',
          '외부 API 호출 결과를 비구조화 할당과 옵셔널 체이닝으로 가공',
          '표 형태로 가공 결과 표시',
        ],
        hint: 'Modern JavaScript 화면의 [활용 API] 탭에서 확인할 수 있습니다.',
        loader: () => import('../views/ModernJavaScriptChallengeView.vue'),
      },
    ],
  },
]

export const challenges = challengeChapters.flatMap((chapter) =>
  chapter.challenges.map((challenge) => ({
    ...challenge,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterTone: chapter.tone,
  })),
)

export const defaultChallengeId = challenges[0].id
