# Reactive State Challenge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the page 107 Vue Composition API challenge with interactive `ref()` and `reactive()` examples.

**Architecture:** A focused `ReactiveStateChallenge.vue` owns all demonstration state and event handlers. `App.vue` only imports and renders that practice component, matching the existing challenge pattern.

**Tech Stack:** Vue 3 Composition API, JavaScript, Vue Single-File Components, Vite

## Global Constraints

- Preserve all existing practice components.
- Keep the site in its existing light-mode presentation.
- Do not add dependencies.

---

### Task 1: Reactive State Challenge

**Files:**
- Create: `src/components/practices/basic/ReactiveStateChallenge.vue`
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: Vue's `ref()` and `reactive()` APIs.
- Produces: Default Vue component rendered as `<ReactiveStateChallenge />`.

- [ ] **Step 1: Create the challenge component**

Define `count`, `name`, `isActive`, `items`, and `user` with `ref()`. Define `userReactive` and `reactiveItems` with `reactive()`. Add handlers for incrementing, toggling, appending fruit, changing the nested user name, increasing age, and removing reactive array entries.

- [ ] **Step 2: Render both examples**

Create separate `ref()` and `reactive()` sections. Bind each value to visible output and connect every button to its corresponding handler. Render array values with stable value-and-index keys because duplicate fruit names can be appended.

- [ ] **Step 3: Switch the application entry component**

Replace the `WeatherChallenge` import and element in `src/App.vue` with `ReactiveStateChallenge`, leaving `WeatherChallenge.vue` unchanged.

- [ ] **Step 4: Verify the implementation**

Run `npm run build` and expect a successful Vite production build. Start or reuse the Vite development server and verify the page renders without an error overlay.

- [ ] **Step 5: Commit the implementation**

Stage only `src/App.vue`, `src/components/practices/basic/ReactiveStateChallenge.vue`, and this plan, then commit with `feat: add reactive state challenge` if a commit is requested.
