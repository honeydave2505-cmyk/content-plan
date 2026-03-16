import { GeneratedContent, GenerateRequest } from "@/types";

/**
 * Generate niche-specific content based on an image description and parameters.
 *
 * In production this would call an AI service (e.g. OpenAI, Gemini, Claude).
 * The current implementation returns realistic template-based content so the
 * UI can be developed and tested without an API key.
 */
export function generateContent(req: GenerateRequest): GeneratedContent {
  const nicheTemplates = getNicheTemplates(req.niche);
  const template =
    nicheTemplates[Math.floor(Math.random() * nicheTemplates.length)];

  const title = template.title;
  const body = buildBody(template.body, req);
  const hashtags = template.hashtags;

  return {
    id: crypto.randomUUID(),
    title,
    body,
    hashtags,
    platform: req.platform,
    niche: req.niche,
    imageUrl: undefined,
    createdAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Niche-specific templates
// ---------------------------------------------------------------------------

interface ContentTemplate {
  title: string;
  body: string;
  hashtags: string[];
}

function buildBody(template: string, req: GenerateRequest): string {
  let text = template;
  if (req.imageDescription) {
    text = text.replace("{{imageContext}}", req.imageDescription);
  } else {
    text = text.replace(
      "{{imageContext}}",
      "your latest visual content"
    );
  }
  if (req.keywords?.length) {
    text += `\n\nKey topics: ${req.keywords.join(", ")}`;
  }
  return text;
}

function getNicheTemplates(niche: string): ContentTemplate[] {
  const templates: Record<string, ContentTemplate[]> = {
    fitness: [
      {
        title: "Transform Your Routine 💪",
        body: "Ready to level up? Here's a fresh take on {{imageContext}}. Consistency beats perfection every single time — show up for yourself today!",
        hashtags: ["#Fitness", "#WorkoutMotivation", "#GymLife", "#FitFam"],
      },
      {
        title: "Fuel Your Gains 🔥",
        body: "Check out {{imageContext}} — the secret ingredient to sustainable progress. Remember: nutrition + training = results.",
        hashtags: ["#FitnessJourney", "#NutritionTips", "#HealthyLiving"],
      },
    ],
    food: [
      {
        title: "Taste the Magic 🍽️",
        body: "Nothing beats {{imageContext}}! This recipe is a crowd-pleaser that takes only 30 minutes. Save this one for your next dinner party.",
        hashtags: ["#Foodie", "#HomeCooking", "#RecipeOfTheDay", "#Yummy"],
      },
      {
        title: "Cook Like a Pro 👨‍🍳",
        body: "Here's a behind-the-scenes look at {{imageContext}}. Simple ingredients, big flavors — that's the philosophy.",
        hashtags: ["#CookingTips", "#FoodPhotography", "#Delicious"],
      },
    ],
    travel: [
      {
        title: "Wanderlust Calling ✈️",
        body: "Discover the beauty of {{imageContext}}. This destination deserves a spot on your bucket list — pack your bags!",
        hashtags: ["#Travel", "#Wanderlust", "#TravelGram", "#Explore"],
      },
      {
        title: "Hidden Gems 🗺️",
        body: "Most travelers miss {{imageContext}}. Here's why it's worth the detour — and how to plan the perfect visit.",
        hashtags: ["#HiddenGem", "#TravelTips", "#Adventure"],
      },
    ],
    fashion: [
      {
        title: "Style Spotlight 👗",
        body: "Elevate your look with {{imageContext}}. Mix and match these pieces for effortless everyday style.",
        hashtags: ["#Fashion", "#OOTD", "#StyleInspo", "#Trendy"],
      },
    ],
    tech: [
      {
        title: "Tech You Need to Know 💻",
        body: "Exploring {{imageContext}} — here's how this technology is changing the game. Early adopters, take note!",
        hashtags: ["#Tech", "#Innovation", "#GadgetReview", "#FutureTech"],
      },
    ],
    business: [
      {
        title: "Scale Smarter 📈",
        body: "Lessons from {{imageContext}}: Growth isn't about doing more — it's about doing what matters. Here are 3 takeaways.",
        hashtags: ["#Business", "#Entrepreneur", "#StartupLife", "#Growth"],
      },
    ],
    education: [
      {
        title: "Learn Something New 📚",
        body: "Diving into {{imageContext}} today. Knowledge compounds — invest 15 minutes daily and see the difference in a month.",
        hashtags: ["#Education", "#Learning", "#StudyTips", "#Knowledge"],
      },
    ],
    lifestyle: [
      {
        title: "Live Intentionally 🌿",
        body: "A glimpse into {{imageContext}}. Small daily habits create extraordinary lives. What's one habit you're starting this week?",
        hashtags: ["#Lifestyle", "#Wellness", "#SelfCare", "#Mindfulness"],
      },
    ],
    health: [
      {
        title: "Your Health Matters 🏥",
        body: "Understanding {{imageContext}} can transform your well-being. Here are evidence-based tips you can apply right now.",
        hashtags: ["#Health", "#Wellness", "#MentalHealth", "#HealthyHabits"],
      },
    ],
    finance: [
      {
        title: "Money Moves 💰",
        body: "Breaking down {{imageContext}} — smart financial decisions start with understanding the basics. Here's your cheat sheet.",
        hashtags: ["#Finance", "#Investing", "#MoneyTips", "#FinancialFreedom"],
      },
    ],
  };

  return templates[niche] ?? templates["lifestyle"]!;
}
