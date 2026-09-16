# Obbian frontend

A responsive Next.js App Router + TypeScript + Tailwind CSS implementation of the ten screens in the Obbian Figma prototype. Uses Yarn Classic and locally bundled Inter fonts.

## Run

```sh
yarn install
yarn dev
```

Open http://localhost:3000. Requires Node.js 20.9 or newer.

```sh
yarn typecheck
yarn build
yarn start
```

For browser tests, run `yarn build` followed by `yarn test:e2e`. Tests start an isolated production server on port 3100 and cover desktop and mobile. Before the first browser test run, install Chromium with `yarn playwright install chromium`.

## Screens

| URL | Screen |
| --- | --- |
| `/` | Discover and search filters |
| `/search` | Search results and sorting |
| `/vehicle` | Selected vehicle details |
| `/checkout` | Validated demo checkout |
| `/confirmation` | Booking confirmation |
| `/tracking` | Animated, pausable tracking simulation |
| `/policy` | Local policy assistant and sources |
| `/trips` | Trips, date changes, cancellation and receipt downloads |
| `/saved` | Saved vehicles |
| `/support` | Searchable FAQs and demo contact form |

Bookings, selected vehicle, pickup date and saved vehicles persist in browser localStorage under `obbian-v1`. The initial data includes an upcoming trip and three completed trips. Clearing this key resets the demo.

## Scope

This is a working frontend prototype. Payment never charges a card; checkout accepts sample driver details and only stores the driver's name with the demo booking. Phone and licence values are not persisted. Tracking is a timer simulation, not GPS. Policy answers come from the local demo library in `lib/data.ts`, not a live AI or RAG service. Support submissions are not transmitted. Pricing, policies and inventory are sample data.

The implementation uses the Figma colours, typography, sidebar, cards and emoji vehicle illustrations. Full metadata for all ten screens was retrieved. Detailed design context was available for Discover, Search Results, Checkout and Confirmation before the Figma Starter MCP quota was exhausted; the other screens use their retrieved structure and shared design tokens. Layouts adapt for mobile instead of preserving desktop absolute coordinates.

## Component structure

- `components/obbian.tsx`: small app shell that selects a screen and mounts dialogs.
- `components/obbian-provider.tsx`: shared state, persistence and booking actions.
- `components/screens/`: one file for each of the ten screens.
- `components/panels/`: separate files for search filters, rental summary, driver details, policy chat, evidence, trips, and other panels.
- `components/dialogs/`: individual booking-management and contact dialogs.
- `components/ui/`: reusable dropdown, input, textarea, buttons, panel, chip, header, car visual and map.
- `data/seed-past.ts`: initial completed-trip data.

`Dropdown` accepts `options`, a controlled `value`/`onChange` pair or `defaultValue`, and an accessible `aria-label`. A `name` adds a hidden form field. It supports arrow keys, Home/End, type-ahead, Enter/Space, Escape, and outside-click dismissal. `Input` and `Textarea` accept native attributes and refs, preserving browser form validation.
