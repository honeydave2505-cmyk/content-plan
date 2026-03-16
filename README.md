# ContentPlanner

A user-friendly content planner interface built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Organize, schedule, and manage your content across multiple platforms from a single dashboard.

## Features

- **Dashboard** – Overview of all content with stats (total, drafts, scheduled, published)
- **Content Calendar** – Visual monthly calendar showing scheduled content
- **Create Content** – Form to draft new content with platform, category, date, and status
- **Content Library** – Browse, search, and filter all content by status and platform

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
```

### 4. Start the production server

```bash
npm start
```

### 5. Run linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout with sidebar navigation
│   ├── page.tsx           # Dashboard page
│   ├── globals.css        # Global styles and theme variables
│   ├── calendar/
│   │   └── page.tsx       # Calendar view page
│   ├── create/
│   │   └── page.tsx       # Content creation form page
│   └── library/
│       └── page.tsx       # Content library with filters
├── components/
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── Header.tsx         # Page header component
│   ├── StatsCard.tsx      # Statistics card component
│   ├── ContentCard.tsx    # Content item card component
│   ├── CalendarView.tsx   # Monthly calendar view
│   └── ContentForm.tsx    # Content creation form
└── data/
    └── sampleContent.ts   # Sample content data
```

## Tech Stack

- [Next.js](https://nextjs.org/) – React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) – Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
