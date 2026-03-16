# ContentAI – AI-Powered Content Planner

A high-converting, niche-specific content planning web application built with **Next.js 14**, **Tailwind CSS**, and **OpenAI GPT-4o**.

## Features

- 🤖 **AI Image Analysis** — Upload any image and AI detects your niche, mood, and generates content topics
- 🎯 **Niche-Specific Content** — All content is laser-targeted to your chosen niche (15+ niches supported)
- 📱 **Multi-Platform Support** — Instagram, Twitter/X, LinkedIn, YouTube, TikTok, Facebook
- ✍️ **Complete Content Plans** — Full captions, hashtags, CTA, best posting times & engagement tips
- ⚡ **Instant Generation** — 3–12 content ideas generated in seconds
- 💾 **Export Plans** — Download your content plan as a text file
- 🌙 **Demo Mode** — Works without an API key using niche-specific sample content

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o (image vision + text generation)
- **Icons**: Lucide React
- **File Upload**: React Dropzone
- **Language**: TypeScript

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

> **Note**: The app works in demo mode without an API key, using niche-specific sample content.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Application Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Navbar
│   ├── page.tsx                # Landing page
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard with stats & previews
│   ├── content-planner/
│   │   └── page.tsx            # Main content planner (3-step wizard)
│   └── api/
│       ├── analyze-image/
│       │   └── route.ts        # POST /api/analyze-image
│       └── generate-content/
│           └── route.ts        # POST /api/generate-content
├── components/
│   ├── ui/
│   │   ├── Button.tsx          # Reusable button component
│   │   ├── Card.tsx            # Card components
│   │   ├── Input.tsx           # Input component
│   │   └── Modal.tsx           # Modal component
│   ├── Navbar.tsx              # Navigation bar
│   ├── ImageUploader.tsx       # Drag & drop image upload with AI analysis
│   ├── NicheSelector.tsx       # Niche selection grid with search
│   ├── AIContentGenerator.tsx  # Content generation form
│   └── ContentCard.tsx         # Individual content idea card
├── lib/
│   ├── openai.ts               # OpenAI API integration
│   └── utils.ts                # Utilities, constants, niche/platform data
└── types/
    └── index.ts                # TypeScript types
```

## User Flow

1. **Upload Image** (optional) — AI analyzes image to detect niche and extract content context
2. **Select Niche** — Choose from 15+ niches or define a custom niche
3. **Configure** — Select platforms, content types, tone, target audience
4. **Generate** — AI creates niche-specific content ideas with full captions, hashtags, and tips
5. **Use** — Copy content directly or download the full plan

## Supported Niches

Fitness, Food & Cooking, Travel, Fashion, Technology, Beauty & Skincare, Business, Education, Entertainment, Health, Lifestyle, Music, Photography, Sports, Custom

## Deployment

Deploy on [Vercel](https://vercel.com) with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Add your `OPENAI_API_KEY` as an environment variable in your Vercel dashboard.

## License

MIT
