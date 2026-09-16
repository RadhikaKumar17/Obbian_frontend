# Obbian frontend

A responsive Next.js App Router + TypeScript + Tailwind CSS implementation of the ten screens in the Obbian Figma prototype. Data and business logic live in the `OBBIAN_BACKEND` Node.js API; the frontend talks to it exclusively through TanStack Query. Uses Yarn Classic and locally bundled Inter fonts.

## Run

Start the backend first (see `OBBIAN_BACKEND/README` section below), then:

```sh
yarn install
yarn dev
```

Open http://localhost:3000. Requires Node.js 20.9 or newer. The frontend reads the API base URL from `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:4000`).

```sh
yarn typecheck
yarn build
yarn start
```

For browser tests, run `MONGODB_URI=... yarn test:e2e` (the backend requires a MongoDB connection — see Backend below). Playwright starts an isolated backend (port 4000) and production frontend (port 3100) and covers desktop and mobile. Before the first browser test run, install Chromium with `yarn playwright install chromium`.

## Screens

| URL | Screen |
| --- | --- |
| `/` | Discover and search filters |
| `/search` | Search results and sorting |
| `/vehicle` | Selected vehicle details |
| `/checkout` | Checkout with driver details and payment method |
| `/confirmation` | Booking confirmation |
| `/tracking` | Live pickup status on a Leaflet/OpenStreetMap map, streamed over WebSocket |
| `/policy` | Policy assistant and retrieved sources |
| `/trips` | Trips, date changes, cancellation and receipt downloads |
| `/saved` | Saved vehicles |
| `/support` | Searchable FAQs and support ticket form |

Vehicles, availability, bookings, saved vehicles, support tickets and policy answers are all served by the backend and scoped to an httpOnly session cookie. Nothing is persisted in `localStorage`.

## Scope

Checkout collects real driver details (name, mobile, licence) and a payment method; payment is collected at pickup, no card is charged. Policy answers come from a keyword-matched retrieval step (the RAG logic) served by the backend's policy library, not a live LLM — intentionally untouched. Support tickets are stored by the backend, not transmitted externally.

### Geospatial search and live GPS tracking

- Vehicle search takes a GPS origin (`lat`/`lng`) and computes real haversine distance server-side; the radius filter and "nearest first" sort are genuine geospatial queries, not a static per-vehicle number.
- The Discover map (`components/ui/map-panel.tsx`) is a real Leaflet + OpenStreetMap map (free, no API key): it plots nearby vehicles, draws the search radius as a circle, supports "Use my location" via the browser Geolocation API, and lets you click anywhere on the map to search from that point instead.
- Once a booking is confirmed, the backend (`OBBIAN_BACKEND/src/tracking-simulator.js`) simulates a driver's GPS position moving toward the pickup point and pushes live updates over a WebSocket (`/ws/tracking`, via the `ws` package) to any subscribed client — the tracking screen's map and ETA update in real time. A REST poll (`GET /api/bookings/:id/tracking`) is kept as an automatic fallback for clients without WebSocket support. Movement is paced to arrive in ~30 seconds for a good demo, while the displayed ETA is computed from a realistic city driving speed.
- On arrival the booking auto-transitions `Confirmed → Active`. The renter can then self-complete the trip (`Active → Completed`) from the tracking screen or the trips list — this is what marks a trip "completed" for a demo, no admin action needed.

## Component structure

- `components/obbian.tsx`: small app shell that selects a screen and mounts dialogs.
- `components/obbian-provider.tsx`: composes the TanStack Query hooks into shared UI state and booking actions.
- `components/query-provider.tsx`: the app's `QueryClientProvider`.
- `components/screens/`: one file for each of the ten screens.
- `components/panels/`: separate files for search filters, rental summary, driver details, policy chat, evidence, trips, and other panels.
- `components/dialogs/`: individual booking-management and contact dialogs.
- `components/ui/`: reusable dropdown, input, textarea, buttons, panel, chip, header, car visual and map.
- `hooks/`: TanStack Query hooks (`use-config`, `use-vehicles`, `use-saved`, `use-bookings`, `use-tracking`, `use-live-tracking`, `use-geolocation`, `use-policies`, `use-support`) — the only place that talks to `lib/api.ts` or the tracking WebSocket.
- `lib/api.ts`: fetch client for the backend, with cookies included for session auth.
- `lib/types.ts`: shared API types (`Vehicle`, `Booking`, `Config`, `Tracking`, `Policy`).

`Dropdown` accepts `options`, a controlled `value`/`onChange` pair or `defaultValue`, and an accessible `aria-label`. A `name` adds a hidden form field. It supports arrow keys, Home/End, type-ahead, Enter/Space, Escape, and outside-click dismissal. `Input` and `Textarea` accept native attributes and refs, preserving browser form validation.

## Backend

`OBBIAN_BACKEND` is a standalone Node.js HTTP API (see `OBBIAN_BACKEND/src/server.js`), with `mongodb` and `ws` as its only dependencies. It is self-contained and can be moved out of this folder at any time — nothing in the frontend imports it directly, they only communicate over HTTP/WebSocket.

All data (vehicles, bookings, saved lists, sessions, tickets, tracking, policies) lives in MongoDB, not a local file — required so the data survives redeploys on hosts with ephemeral disks. `OBBIAN_BACKEND/src/store.js` connects once and keeps the working set in memory for fast synchronous reads, committing every mutation back to Mongo atomically.

```sh
cd OBBIAN_BACKEND
yarn install
cp .env.example .env   # then set MONGODB_URI (see below)
yarn dev                # http://127.0.0.1:4000
```

### Getting a MongoDB connection string

Either works — paste the resulting connection string into `MONGODB_URI` in `.env`:

- **Free MongoDB Atlas cluster**: [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register) → create a free (M0) cluster → Database Access (create a user) → Network Access (allow `0.0.0.0/0` for simplicity, or your deploy host's IPs) → Connect → Drivers → copy the `mongodb+srv://...` string.
- **Railway's MongoDB plugin**: in a Railway project, "New" → "Database" → "Add MongoDB" — it provisions a database and gives you a connection string in its Variables tab.

### Deploying the backend

This backend needs a host that keeps long-lived WebSocket connections open (for live GPS tracking) — that rules out pure serverless platforms like Vercel/Netlify Functions. Recommended:

- **Railway** ([railway.app](https://railway.app)): connect the GitHub repo, set the root/start directory to `OBBIAN_BACKEND`, add the MongoDB plugin (above) or your own Atlas URI, set `FRONTEND_ORIGINS` to your deployed frontend's URL, and deploy. WebSockets and always-on services work out of the box.
- **Render** ([render.com](https://render.com)) or **Fly.io** ([fly.io](https://fly.io)) are solid alternatives with the same requirements: set `MONGODB_URI`, `FRONTEND_ORIGINS`, and start with `node src/server.js`.

Once deployed, point the frontend at it by setting `NEXT_PUBLIC_API_URL` to the deployed backend's `https://` URL (and `COOKIE_SECURE=true`, `COOKIE_SAME_SITE=None` on the backend if the frontend and backend end up on different domains — same-site `Lax` cookies only work when frontend and backend share a hostname, as they do in local dev).
