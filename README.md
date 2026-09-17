# Obbian frontend

Next.js (App Router) + TypeScript + Tailwind frontend for Obbian, a vehicle rental app. All data and business logic live in the `OBBIAN_BACKEND` API and the `OBBIAN_RAG` service; this app talks to them over HTTP/WebSocket via TanStack Query.

## Run

```sh
yarn install
yarn dev        # http://localhost:3000
```

Requires Node.js 20.9+, and the backend running (see `OBBIAN_BACKEND`).

```sh
yarn typecheck
yarn build
yarn start
```

## Environment

Set in `.env`:

```env
NEXT_PUBLIC_API_URL=https://obbianbackend-production.up.railway.app
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_browser_key
NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID=your_map_id
```

The Google Maps key is a public, domain-restricted browser key by design.

## Screens

| URL | Screen |
| --- | --- |
| `/` | Discover and search filters |
| `/search` | Search results and sorting |
| `/vehicle` | Selected vehicle details |
| `/checkout` | Checkout with driver details and payment method |
| `/confirmation` | Booking confirmation |
| `/tracking` | Live vehicle location on a Google map, streamed over WebSocket |
| `/policy` | Policy chat (RAG-backed) |
| `/trips` | Trips, date changes, cancellation, receipts |
| `/saved` | Saved vehicles |
| `/support` | FAQs and support tickets |

Also on `/`: the **AI Assistant** panel — a tool-calling agent that can search vehicles, quote a price, list trips, track a vehicle, or answer a policy question from one chat box.

## Structure

- `components/obbian-provider.tsx` — shared state, TanStack Query hooks, booking/chat actions
- `components/screens/`, `components/panels/`, `components/dialogs/`, `components/ui/`
- `hooks/` — the only layer that calls `lib/api.ts` or the tracking WebSocket
- `lib/api.ts`, `lib/types.ts` — API client and shared types

## Backend

See `OBBIAN_BACKEND` for the API and `OBBIAN_RAG` for the policy RAG service. Chat history for both the Policy panel and the AI Assistant is persisted via Mem0, keyed per session.
