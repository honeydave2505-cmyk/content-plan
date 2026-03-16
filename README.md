# ContentAI — AI-Powered Content Planner

A high-converting content planner web application that generates niche-specific social media content from images using AI.

## Features

- **🖼️ Image-to-Content Generation** — Upload any image and the AI generates platform-ready captions, posts, and articles
- **🎯 Niche-Specific Content** — Choose from 10+ niches (Fitness, Food, Travel, Tech, etc.) for tailored content
- **📅 Content Calendar** — Visual weekly planner to schedule and track your posts
- **📚 Content Library** — Save, browse, and filter all generated content
- **🤖 Multi-AI Support** — Configure OpenAI, Google Gemini, or Anthropic Claude as your AI provider
- **📱 Multi-Platform** — Generate content optimized for Instagram, Twitter/X, LinkedIn, TikTok, YouTube, Facebook, and Blog
- **🎨 Tone Control** — Choose between Casual, Professional, Humorous, and Inspirational tones
- **⚙️ Customizable Settings** — Set default preferences, timezone, and scheduling options

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Pluggable AI providers (OpenAI, Gemini, Claude)

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Landing / home page
│   ├── layout.tsx                # Root layout with sidebar + header
│   ├── dashboard/page.tsx        # Analytics dashboard
│   ├── niche-selection/page.tsx  # Niche picker
│   ├── generate/page.tsx         # Image upload + AI content generation
│   ├── calendar/page.tsx         # Weekly content calendar
│   ├── library/page.tsx          # Saved content library
│   ├── settings/page.tsx         # App settings & AI config
│   └── api/
│       ├── generate/route.ts     # POST — generate content via AI
│       └── niches/route.ts       # GET  — list available niches
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   └── Header.tsx            # Top header bar
│   ├── ui/
│   │   ├── Button.tsx            # Reusable button component
│   │   ├── Card.tsx              # Generic card wrapper
│   │   └── StatCard.tsx          # Dashboard stat card
│   └── features/
│       ├── ImageUploader.tsx     # Drag-and-drop image uploader
│       ├── ContentPreview.tsx    # Generated content preview card
│       ├── NicheCard.tsx         # Niche selection card
│       └── CalendarView.tsx      # 7-day calendar strip
├── lib/
│   ├── content-generator.ts     # Template-based content generation engine
│   ├── niches.ts                # Niche definitions and metadata
│   └── platforms.ts             # Platform definitions and metadata
└── types/
    └── index.ts                 # TypeScript type definitions
```

## Prerequisites

Before running this project you need **Node.js** installed on your machine.

| Requirement | Minimum version | Check with |
|-------------|----------------|------------|
| Node.js     | 18.17 or later | `node --version` |
| npm         | 9 or later     | `npm --version` |

> **Don't have Node.js?** Download it from [nodejs.org](https://nodejs.org/) (the LTS version is recommended).

## How to Run (Step-by-Step)

### 1. Clone the repository

```bash
git clone https://github.com/honeydave2505-cmyk/content-plan.git
cd content-plan
```

### 2. Install dependencies

```bash
npm install
```

This downloads all the packages the app needs (Next.js, React, Tailwind CSS, etc.) into a `node_modules` folder. It only needs to be done once (or again after `package.json` changes).

### 3. Start the development server

```bash
npm run dev
```

You will see output like:

```
▲ Next.js 16.x.x
- Local:   http://localhost:3000
```

### 4. Open the app in your browser

Go to **[http://localhost:3000](http://localhost:3000)** — you should see the ContentAI home page.

### 5. Explore the app

Use the **sidebar** on the left to navigate between pages:

| Sidebar link | What it does |
|---|---|
| **Dashboard** | View stats, quick actions, and recent activity |
| **Select Niche** | Pick a content niche (Fitness, Food, Travel, etc.) |
| **Generate Content** | Upload an image → choose niche/platform/tone → click **Generate** |
| **Content Calendar** | See your weekly content schedule |
| **Content Library** | Browse and filter all saved content |
| **Settings** | Configure AI provider, defaults, timezone |

### 6. Stop the server

Press **Ctrl + C** in the terminal to stop the development server.

## Available npm Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Starts the app in **development mode** with hot-reload (changes update instantly) |
| `npm run build` | Creates an optimized **production build** in the `.next` folder |
| `npm start` | Runs the production build (must run `npm run build` first) |
| `npm run lint` | Checks code for style and quality issues using ESLint |

## Building for Production

```bash
# 1. Create the production build
npm run build

# 2. Start the production server
npm start
```

The production server also runs on [http://localhost:3000](http://localhost:3000) by default.

## AI Integration

The app ships with a built-in **template engine** for demo purposes — no API key is required to try it out. The "Generate Content" page works immediately.

To connect a real AI provider for smarter content generation:

1. Go to **Settings** → **AI Configuration**
2. Select your AI provider (OpenAI, Google Gemini, or Anthropic Claude)
3. Enter your API key
4. The `/api/generate` endpoint will use your configured provider

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `command not found: node` | Install Node.js from [nodejs.org](https://nodejs.org/) |
| `npm install` fails | Delete `node_modules` and `package-lock.json`, then run `npm install` again |
| Port 3000 is already in use | Run `npm run dev -- -p 3001` to use a different port |
| Page shows an error after pulling new code | Run `npm install` again to pick up any new dependencies |

## Pages Overview

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Landing page with feature highlights |
| Dashboard | `/dashboard` | Analytics overview with stats and quick actions |
| Niche Selection | `/niche-selection` | Choose your content niche |
| Generate | `/generate` | Upload image + configure + generate content |
| Calendar | `/calendar` | Weekly content scheduling view |
| Library | `/library` | Browse and filter saved content |
| Settings | `/settings` | AI provider, defaults, scheduling config |
