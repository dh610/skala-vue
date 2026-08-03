# Computed and Watch Challenge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the page 125 Composition API challenge with six interactive computed and watcher examples.

**Architecture:** A single `ComputedWatchChallenge.vue` component owns six independent groups of reactive state and displays each callback result in its own monitor. `App.vue` remains a thin entry point that renders the current practice component.

**Tech Stack:** Vue 3 Composition API, JavaScript, Vue Single-File Components, Vite

## Global Constraints

- Preserve all existing practice components.
- Keep the site in its existing light-mode presentation.
- Do not add dependencies.
- Display watcher results in the page instead of requiring browser console inspection.

---

### Task 1: Computed and Watch Challenge

**Files:**
- Create: `src/components/practices/basic/ComputedWatchChallenge.vue`
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: Vue `ref`, `reactive`, `computed`, `watch`, and `watchEffect` APIs.
- Produces: A default Vue component rendered as `<ComputedWatchChallenge />`.

- [ ] **Step 1: Define independent reactive examples**

Create state for computed caching, basic city watching, city-and-period multi-source watching, nested user watching, reactive product price watching, and automatic `watchEffect` tracking. Give each watcher its own visible message ref.

- [ ] **Step 2: Render all six sections**

Add controls that mutate the watched state and monitor panels that show old and new values. Keep labels explicit enough to identify which watcher fired without relying on console output.

- [ ] **Step 3: Switch the application entry component**

Replace the `ReactiveStateChallenge` import and element in `src/App.vue` with `ComputedWatchChallenge`. Leave `ReactiveStateChallenge.vue` unchanged.

- [ ] **Step 4: Verify the implementation**

Run `npx eslint src/App.vue src/components/practices/basic/ComputedWatchChallenge.vue` and expect exit code 0. Run `npm run build` and expect a successful Vite production build. Confirm the development server recompiles without an error overlay.
