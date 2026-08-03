# Lifecycle Challenge Design

## Goal

Implement the component lifecycle code challenge from page 136 of `presentation.pdf` with observable mount, update, and unmount behavior.

## Structure

- Add `src/components/practices/basic/LifecycleChallenge.vue` as the parent controller.
- Add `src/components/practices/basic/LifecycleDemo.vue` as the lifecycle subject.
- Preserve every existing practice component.
- Update `src/App.vue` to render `LifecycleChallenge`.

## Behavior

The parent uses `v-if` to create and destroy the child component. Its control button changes between removing and recreating the child so the lifecycle can be repeated.

The child starts a three-second interval in `onMounted`, increments a visible counter, and records lifecycle messages. `onUpdated` records each completed DOM update. `onUnmounted` clears the interval before recording cleanup in the browser console. The child also provides a manual increment button so updates can be triggered immediately.

## Log Visibility

Mount and update events are shown in an on-page event log and written to the browser console. The unmount event is written to the browser console because the child's on-page log disappears with the component; the parent displays the current mounted or unmounted state.

## Presentation

Use a light, compact practice layout with a stable counter panel, a clear create/remove control, and a scrollable lifecycle event list. Keep controls usable on mobile widths and add no dependencies.

## Verification

- Run ESLint against the parent, child, and `App.vue`.
- Run the Vite production build.
- Confirm the development server recompiles without errors.
