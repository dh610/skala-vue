# Reactive State Challenge Design

## Goal

Implement the code challenge from page 107 of `presentation.pdf` by demonstrating Vue Composition API reactive state with both `ref()` and `reactive()`.

## Structure

- Add `src/components/practices/basic/ReactiveStateChallenge.vue`.
- Keep the existing practice components unchanged.
- Update `src/App.vue` to render the new challenge component.

## Behavior

The `ref()` section demonstrates primitive, array, and object values. It supports incrementing a count, editing a name, toggling an active state, appending a fruit, and changing a nested user name.

The `reactive()` section demonstrates an object and an array. It supports increasing a user's age and adding or removing fruit entries by mutating the existing reactive values.

## Presentation

Both examples appear on one light-mode practice page, split into clearly labeled sections. Controls use the existing project's simple practice styling and remain usable on narrow screens.

## Verification

- Run the production build to catch Vue template and script errors.
- Open the development page and verify each control updates the corresponding rendered state.
