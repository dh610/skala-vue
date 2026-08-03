# Weather Composition Assignment Design

## Goal

Implement the weather Composition API assignment from page 126 of `presentation.pdf` using local mock weather data.

## Structure

- Add `src/components/practices/basic/WeatherCompositionAssignment.vue`.
- Preserve `WeatherChallenge.vue` and every other existing practice component.
- Update `src/App.vue` to render the new assignment component.

## State And Data Flow

- `searchQuery` stores the current city search text.
- `selectedCityInfo` stores the selected weather object or `null` when no city is selected.
- `weatherList` stores the local array of city weather objects.
- `filteredWeatherList` is computed from `searchQuery` and `weatherList`.
- A watcher observes `selectedCityInfo` and records a console message whenever the selection changes.
- A watch effect observes the current search query and computed matches and records a console message whenever either changes.

## User Experience

The page contains a city search input, filtered weather cards, and a selection status bar. An empty search shows all cities, a matching search shows matching cities, and an unmatched search shows a clear empty-state message. Selecting a card updates the status bar; its detail button shows the city's weather without also triggering the card selection event.

## Presentation

Use a light, compact weather dashboard that follows the project's existing practice styling and remains usable on mobile widths. Use text weather labels and restrained color accents rather than external assets or dependencies.

## Verification

- Run ESLint against the modified Vue files.
- Run the Vite production build.
- Confirm the development server recompiles without an error overlay.
