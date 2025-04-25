📋 Table of Contents
🤖 Introduction

⚙️ Tech Stack

🔋 Features

🤸 Quick Start

🕸️ Configuration & Snippets

🔗 Links

🤖 Introduction
CalorieMate guides users through a horizontal “slides” flow—starting with personal info, then meal & activity logging, ending on a dashboard summarizing net calories versus daily requirements. Built with React, Vite, and Tailwind CSS, it persists data locally via IndexedDB.

⚙️ Tech Stack
Vite – Fast build tool

React – Component‐based UI

Tailwind CSS – Utility‐first styling

IndexedDB (via idb) – Local data storage

Recharts – Charting in dashboard

Lucide‐React – Icons

🔋 Features
Horizontal Scroll Snap: Full‐screen slides for each section

Animated Arrows: Guide users to next slide

Form Persistence: Stores personal info and logs locally

Meal & Activity Logs: Add, list, and clear entries

Dynamic Dashboard: Shows consumed, burned, net, and required calories

Responsive Design: Mobile and desktop support

🤸 Quick Start
Prerequisites
Node.js ≥ 16

npm 

Git

Local Setup
bash
Copy
Edit
# Clone the repo
git clone https://github.com/Bibster3/CalorieMate
cd CalorieMate

# Install dependencies
npm install

# Start development server
npm run dev
Open http://localhost:5173 in your browser to view.

🕸️ Configuration & Snippets
<details> <summary><code>vite.config.js</code></summary>
js
Copy
Edit
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/CalorieMate/',    // adjust if hosting under a subpath
  plugins: [react()],
});
</details> <details> <summary><code>main.tsx</code></summary>
tsx
Copy
Edit
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
</details> <details> <summary><code>tailwind.config.js</code></summary>
js
Copy
Edit
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
</details>
🔗 Links
Repository: https://github.com/Bibster3/CalorieMate
