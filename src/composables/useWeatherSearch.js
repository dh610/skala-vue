import { computed, ref, watch } from 'vue'

/**
 * 전역 도시 검색 로직(검색어 + computed 필터 + watch)을 재사용 가능하게 추출한 Composable.
 *
 * @param {import('vue').Ref<Array>|import('vue').ComputedRef<Array>} allRecords
 *   검색 대상이 되는 전체 도시 레코드(각 레코드는 name/countryCode 포함).
 * @param {(codes: string[]) => void} [onCountriesMatched]
 *   검색 결과가 걸친 국가 코드 목록이 바뀔 때 호출(예: 해당 국가 실시간 로드).
 */
export function useWeatherSearch(allRecords, onCountriesMatched) {
  const searchQuery = ref('')

  const isSearching = computed(() => searchQuery.value.trim() !== '')

  const searchResults = computed(() => {
    const keyword = searchQuery.value.trim()
    if (!keyword) return []
    return allRecords.value.filter((city) => city.name.includes(keyword))
  })

  // 검색어가 여러 국가에 걸치면(예: '오' → 오사카·오스틴) 매치된 국가를 모두 알린다.
  watch(searchResults, (results) => {
    if (!onCountriesMatched) return
    const codes = [...new Set(results.map((city) => city.countryCode))]
    onCountriesMatched(codes)
  })

  return { searchQuery, isSearching, searchResults }
}
