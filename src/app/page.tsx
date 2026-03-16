import Link from 'next/link';
import { Sparkles, ImageIcon, Target, TrendingUp, Zap, ArrowRight, Star, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: ImageIcon,
    title: 'Image-Based AI Analysis',
    description:
      'Upload any image and our AI instantly detects your niche, mood, and generates targeted content ideas from visual context.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Target,
    title: 'Niche-Specific Content',
    description:
      'All generated content is laser-focused on your specific niche — no generic posts, only relevant, authentic ideas that resonate.',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    icon: TrendingUp,
    title: 'Multi-Platform Strategy',
    description:
      'Get tailored content plans for Instagram, Twitter, LinkedIn, YouTube, TikTok and more — each optimized for the platform.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: Zap,
    title: 'Instant Generation',
    description:
      'Generate 3-12 complete content ideas in seconds, including captions, hashtags, posting times, and engagement tips.',
    gradient: 'from-amber-500 to-orange-600',
  },
];

const niches = [
  { emoji: '💪', name: 'Fitness' },
  { emoji: '🍳', name: 'Food' },
  { emoji: '✈️', name: 'Travel' },
  { emoji: '👗', name: 'Fashion' },
  { emoji: '💻', name: 'Tech' },
  { emoji: '💄', name: 'Beauty' },
  { emoji: '💼', name: 'Business' },
  { emoji: '📚', name: 'Education' },
  { emoji: '🎵', name: 'Music' },
  { emoji: '🌿', name: 'Lifestyle' },
  { emoji: '📸', name: 'Photography' },
  { emoji: '⚽', name: 'Sports' },
];

const steps = [
  {
    step: '01',
    title: 'Upload Your Image',
    description: 'Drop in a photo, product shot, or inspiration image — AI analyzes it instantly.',
  },
  {
    step: '02',
    title: 'Select Your Niche',
    description: 'Choose from 15+ niches or define your own custom niche for targeted content.',
  },
  {
    step: '03',
    title: 'Configure & Generate',
    description: 'Pick platforms, content types, tone, and let AI build your complete content plan.',
  },
  {
    step: '04',
    title: 'Copy & Publish',
    description: 'One-click copy captions and hashtags, then post directly to your platforms.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-violet-50/30 to-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-violet-100/50 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-indigo-100/40 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-sm font-medium mb-8">
            <Sparkles size={15} />
            AI-Powered Content Planning
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            Create{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              High-Converting
            </span>
            <br />
            Content in Seconds
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload an image, select your niche, and let AI generate a complete content plan with
            captions, hashtags, posting times, and engagement strategies — all specific to your niche.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/content-planner"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-lg hover:from-violet-700 hover:to-indigo-700 transition-all shadow-xl hover:shadow-violet-500/30 hover:scale-105"
            >
              <Sparkles size={20} />
              Start Planning for Free
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold text-lg hover:border-violet-300 hover:bg-violet-50 transition-all"
            >
              View Dashboard
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-medium">4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-violet-500" />
              <span>Generate in seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Grow Your Brand
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful AI tools designed to help content creators, brands, and marketers build
              engaging, niche-specific content strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description, gradient }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Niches */}
      <section className="py-20 bg-gradient-to-br from-violet-50/50 to-indigo-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Works for Every Niche
            </h2>
            <p className="text-lg text-gray-600">
              From fitness to fashion, our AI understands your industry inside out.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {niches.map(({ emoji, name }) => (
              <Link
                key={name}
                href="/content-planner"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-violet-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium text-gray-700 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{emoji}</span>
                {name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Go from zero to a full content plan in under a minute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ step, title, description }, index) => (
              <div key={step} className="relative text-center">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-violet-200 to-indigo-200" />
                )}
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white font-black text-lg">{step}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Sparkles size={40} className="text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Ready to Transform Your Content Strategy?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            Join thousands of creators who are using AI to build their audience and grow their brand.
          </p>
          <Link
            href="/content-planner"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-violet-700 font-bold text-lg hover:bg-gray-50 transition-all shadow-2xl hover:scale-105"
          >
            <Sparkles size={22} />
            Get Started — It&apos;s Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-900 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-bold text-white">ContentAI</span>
        </div>
        <p className="text-gray-400 text-sm">
          AI-Powered Content Planner — Generate niche-specific content that converts.
        </p>
      </footer>
    </div>
  );
}
