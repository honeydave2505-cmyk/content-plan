import { NextRequest, NextResponse } from 'next/server';
import { generateContentPlanWithAI } from '@/lib/openai';

// Niche-specific mock data for demo mode
const getMockIdeas = (niche: string, platforms: string[], count: number) => {
  const mockIdeas = [
    {
      title: `Top 5 ${niche} Secrets You Need to Know`,
      caption: `🚀 Ready to level up your ${niche} game? Here are the 5 secrets that professionals don't want you to know...\n\nThese strategies have helped thousands of people transform their approach to ${niche}. Whether you're just starting out or looking to take things to the next level, these insights will change everything.\n\n💬 Drop a 🔥 in the comments if you found this helpful!`,
      hashtags: [niche, `${niche}tips`, `${niche}lifestyle`, 'contentcreator', 'socialmedia', 'viral', 'trending', 'fyp', `${niche}community`, 'growth'],
      platform: platforms[0] || 'instagram',
      contentType: 'post',
      callToAction: 'Save this post for later & follow for daily ' + niche + ' tips!',
      bestTimeToPost: 'Tuesday-Thursday, 6-9 PM',
      estimatedReach: '5K-15K accounts',
      engagementTips: [
        'Ask a question in the first line to hook readers',
        'Use a mix of broad and niche-specific hashtags',
        'Reply to every comment in the first hour',
      ],
    },
    {
      title: `Day in My ${niche} Life ✨`,
      caption: `Ever wondered what a full day in the ${niche} world looks like? 👀\n\nFrom morning routines to evening wind-downs, I'm sharing it all! The highs, the lows, and everything in between. This is the raw, unfiltered truth about what it really takes.\n\n🎯 Tag someone who needs to see this!`,
      hashtags: [`${niche}life`, 'dayinmylife', `${niche}creator`, 'authentic', 'behindthescenes', niche, 'lifestyle', 'vlog', 'reallife', 'contentcreation'],
      platform: platforms[1] || platforms[0] || 'instagram',
      contentType: 'reel',
      callToAction: 'Follow along for more honest ' + niche + ' content!',
      bestTimeToPost: 'Friday-Sunday, 12-3 PM',
      estimatedReach: '8K-25K accounts',
      engagementTips: [
        'Start with a bold statement or question in the first 3 seconds',
        'Add trending audio to boost algorithmic reach',
        'Use location tags for local discovery',
      ],
    },
    {
      title: `The ${niche} Mistake Everyone Makes`,
      caption: `🚨 Stop making this ${niche} mistake right now!\n\nI see this ALL the time and it's holding so many people back. Once I figured this out, everything changed for me in the ${niche} space.\n\nHere's exactly what to do instead (swipe for the full breakdown) 👉`,
      hashtags: [`${niche}mistakes`, `${niche}tips`, 'learnfromme', niche, 'growthmindset', 'improvement', 'success', `${niche}hacks`, 'education', 'viral'],
      platform: platforms[0] || 'instagram',
      contentType: 'carousel',
      callToAction: 'Save this so you never make this mistake again!',
      bestTimeToPost: 'Monday, 7-9 AM',
      estimatedReach: '10K-30K accounts',
      engagementTips: [
        'Use carousel format to increase time spent on post',
        'Make slide 1 a strong hook that creates curiosity',
        'End with a clear CTA on the last slide',
      ],
    },
    {
      title: `${niche} Trends You Can't Ignore in 2025`,
      caption: `The ${niche} landscape is changing fast 📈 Are you keeping up?\n\nHere are the top trends that are dominating the ${niche} space right now, and exactly how you can leverage them for maximum impact.\n\n💡 Which trend surprised you most? Comment below!`,
      hashtags: [`${niche}trends`, '2025trends', niche, 'futureforward', 'trending', `${niche}growth`, 'innovation', 'strategy', 'business', 'digitalmarketing'],
      platform: platforms[1] || platforms[0] || 'linkedin',
      contentType: 'article',
      callToAction: 'Follow for weekly ' + niche + ' trend updates!',
      bestTimeToPost: 'Wednesday, 8-10 AM',
      estimatedReach: '3K-12K accounts',
      engagementTips: [
        'Include data points and statistics to boost credibility',
        'Tag relevant industry thought leaders',
        'Cross-post to LinkedIn for professional reach',
      ],
    },
    {
      title: `How I Built My ${niche} Brand from Zero`,
      caption: `Starting from absolute zero in ${niche} 6 months ago to where I am today 🙌\n\nThis is the honest story – including the failures, the pivots, and the breakthrough moments that changed everything.\n\nIf you're thinking about getting into ${niche}, this one's for you. ❤️`,
      hashtags: [`${niche}journey`, 'entrepreneurship', `${niche}brand`, 'startup', 'success', 'motivation', `my${niche}story`, 'authenticity', 'growth', niche],
      platform: platforms[0] || 'instagram',
      contentType: 'story',
      callToAction: 'DM me "START" for my free ' + niche + ' beginner guide!',
      bestTimeToPost: 'Thursday, 8-10 PM',
      estimatedReach: '4K-10K accounts',
      engagementTips: [
        'Use poll stickers to boost story interaction rate',
        'Add a question sticker to gather DMs',
        'Share raw, unpolished moments for authenticity',
      ],
    },
    {
      title: `${niche} Q&A: Your Top Questions Answered`,
      caption: `You asked, I answered! 💬 Here are the most common ${niche} questions I get:\n\n❓ How do I get started with ${niche}?\n❓ What's the biggest challenge in ${niche}?\n❓ How long does it take to see results?\n\nDrop your ${niche} questions in the comments and I'll answer them all! ⬇️`,
      hashtags: [`${niche}qa`, 'questionandanswer', niche, 'community', 'helpingothers', `${niche}help`, 'faq', 'engage', 'askme', 'support'],
      platform: platforms[1] || platforms[0] || 'twitter',
      contentType: 'thread',
      callToAction: 'Follow for more ' + niche + ' answers & drop your questions below!',
      bestTimeToPost: 'Saturday, 11 AM-1 PM',
      estimatedReach: '6K-18K accounts',
      engagementTips: [
        'Number your thread points for easy reading',
        'Pin the thread to your profile for ongoing discovery',
        'Engage with every reply to boost algorithmic push',
      ],
    },
  ];

  return mockIdeas.slice(0, count);
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      niche,
      imageAnalysis,
      platforms,
      contentTypes,
      numberOfIdeas,
      targetAudience,
      tone,
    } = body;

    if (!niche) {
      return NextResponse.json({ error: 'niche is required' }, { status: 400 });
    }

    if (!platforms || platforms.length === 0) {
      return NextResponse.json({ error: 'At least one platform is required' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      // Return niche-specific mock data when no API key is set (demo mode)
      const mockIdeas = getMockIdeas(niche, platforms, numberOfIdeas || 6);
      return NextResponse.json({ ideas: mockIdeas });
    }

    const ideas = await generateContentPlanWithAI({
      niche,
      imageAnalysis,
      platforms,
      contentTypes,
      numberOfIdeas: numberOfIdeas || 6,
      targetAudience,
      tone,
    });

    return NextResponse.json({ ideas });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: 'Failed to generate content. Please try again.' },
      { status: 500 }
    );
  }
}
