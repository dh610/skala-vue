# Computed and Watch Challenge Design

## Goal

Implement the code challenge from page 125 of `presentation.pdf` with interactive examples for `computed()`, `watch()`, multi-source watch, deep watch, watching reactive data, and `watchEffect()`.

## Structure

- Add `src/components/practices/basic/ComputedWatchChallenge.vue`.
- Keep all existing practice components unchanged.
- Update `src/App.vue` to render the new challenge component.

## Behavior

The component contains six independent sections:

1. A computed caching comparison with a dependent count and unrelated dummy value.
2. A basic watcher that reports a city's previous and current values.
3. A multi-source watcher that reports changes to city and forecast period together.
4. A deep watcher for a nested user object, alongside a targeted age watcher that preserves old and new values.
5. A reactive product watcher comparing whole-object watching with targeted price watching.
6. A watch effect that runs immediately and automatically tracks a user name and age.

Each section displays its monitoring result on the page so the behavior can be inspected without relying on browser console output.

## Presentation

Use one light-mode practice page with clearly separated sections and responsive controls. Follow the restrained styling and component organization of the existing challenges.

## Verification

- Run ESLint against the modified Vue files.
- Run the Vite production build.
- Verify the development server compiles the page without an error overlay.
