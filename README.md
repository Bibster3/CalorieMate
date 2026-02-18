# CalorieMate

CalorieMate is a React + TypeScript web app for tracking meals and activities, then comparing net calories against a daily calorie target calculated from personal information.

## Features

- Personal profile form with daily calorie requirement calculation.
- Meal logging with local persistence.
- Activity logging with estimated calorie burn.
- Dashboard view combining meal/activity logs and showing daily balance.
- Data persistence using IndexedDB.

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
- `npm run build` — create production build
- `npm run preview` — preview production build

## Deployment

This project is configured for GitHub Pages under `/CalorieMate/`.

```bash
npm run deploy
```
