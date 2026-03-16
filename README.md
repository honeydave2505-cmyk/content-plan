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

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## AI Integration

The app ships with a built-in template engine for demo purposes. To enable real AI content generation:

1. Go to **Settings** → **AI Configuration**
2. Select your AI provider
3. Enter your API key
4. The `/api/generate` endpoint will use your configured provider

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
