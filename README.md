# CalorieMate

CalorieMate is a React + TypeScript web app for tracking meals and activities, then comparing net calories against a daily calorie target calculated from personal information.

## Demo

![CalorieMate hero screen](src/assets/bg1.jpg)

> Tip: replace this static hero screenshot with a short GIF walkthrough (My Info → Meals → Activity → Dashboard) for strongest hiring impact.

## Features

- Personal profile form with daily calorie requirement calculation.
- Meal logging with local persistence.
- Activity logging with estimated calorie burn.
- Dashboard view combining meal/activity logs and showing daily balance.
- Data persistence using IndexedDB.

## Architecture Overview

CalorieMate uses a small feature-oriented structure:

- `src/components/*` contains UI screens and shared layout elements.
- `src/shared/db/*` wraps IndexedDB access through `idb`.
- `src/shared/functions.ts` holds pure business logic for calorie math.
- `src/shared/types.ts` centralizes app data types.

The app flow is intentionally simple:

1. User profile is stored in the `settings` store.
2. Meals and activities are stored in dedicated object stores.
3. Dashboard reads all three data sources and computes balances in the UI layer.

## Tradeoffs & Design Decisions

- **IndexedDB over backend API**: chosen for offline-first behavior and zero backend hosting cost, at the cost of data being device-local.
- **Single-page horizontal flow**: improves onboarding simplicity, but makes deep-linking to specific sections less direct.
- **Minimal dependency footprint**: helps maintainability and setup speed, though advanced charting/analytics features are intentionally limited.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- idb (IndexedDB wrapper)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Scripts

- `npm run dev` — start local development server
- `npm run lint` — run ESLint
- `npm run typecheck` — run TypeScript type checking
- `npm run test` — run automated unit tests for shared calorie/activity logic
- `npm run build` — create production build
- `npm run preview` — preview production build

## Deployment

This project is configured for GitHub Pages under `/CalorieMate/`.

```bash
npm run deploy
```
