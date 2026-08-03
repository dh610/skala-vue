# Weather Composition Assignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the page 126 weather assignment with Composition API state, computed filtering, watch, and watchEffect.

**Architecture:** A focused `WeatherCompositionAssignment.vue` owns local mock weather data, search state, selection state, derived results, and watcher side effects. `App.vue` remains a thin entry point that renders the current assignment.

**Tech Stack:** Vue 3 Composition API, JavaScript, Vue Single-File Components, Vite

## Global Constraints

- Preserve all existing practice components.
- Keep the site in its existing light-mode presentation.
- Do not add dependencies or call an external weather API.
- Log selected-city and search changes to the browser console as required by the assignment.

---

### Task 1: Weather Composition Assignment

**Files:**
- Create: `src/components/practices/basic/WeatherCompositionAssignment.vue`
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: Vue `ref`, `computed`, `watch`, and `watchEffect` APIs.
- Produces: A default Vue component rendered as `<WeatherCompositionAssignment />`.

- [ ] **Step 1: Define weather state and derived search results**

Create `searchQuery`, `selectedCityInfo`, and `weatherList` refs. Define `filteredWeatherList` so an empty trimmed query returns every city and a non-empty query returns cities whose names include the query.

- [ ] **Step 2: Add required watchers and interactions**

Watch `selectedCityInfo` and log each selection change. Use `watchEffect` to log the search query and current matching city names. Add card selection and a stopped detail-button click that displays the city's current weather.

- [ ] **Step 3: Render all search states**

Render the input, matching weather cards, selected-city status, and the no-result message. Keep the card layout responsive and ensure buttons do not resize based on dynamic content.

- [ ] **Step 4: Switch the application entry component**

Replace the `ComputedWatchChallenge` import and element in `src/App.vue` with `WeatherCompositionAssignment`. Leave `ComputedWatchChallenge.vue` unchanged.

- [ ] **Step 5: Verify the implementation**

Run `npx eslint src/App.vue src/components/practices/basic/WeatherCompositionAssignment.vue` and expect exit code 0. Run `npm run build` and expect a successful Vite production build. Confirm the active development server recompiles without errors.
