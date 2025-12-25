import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Helper to extract text from Claude response
function extractTextFromResponse(content: any[]): string {
  if (!content || content.length === 0) {
    return '';
  }
  
  const textBlocks = content.filter(block => block.type === 'text');
  if (textBlocks.length === 0) {
    return '';
  }
  
  return textBlocks.map(block => block.text).join('\n');
}

// Helper to extract keywords from idea
function extractKeywords(idea: string): string[] {
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'that', 'this', 'is', 'are', 'was', 'were']);
  const words = idea.toLowerCase().split(/\s+/).filter(word => 
    word.length > 3 && !commonWords.has(word)
  );
  return words.slice(0, 3);
}

// Helper to generate startup name from idea
function generateStartupName(idea: string): string {
  const keywords = extractKeywords(idea);
  if (keywords.length > 0) {
    return keywords[0].charAt(0).toUpperCase() + keywords[0].slice(1) + 'ly';
  }
  return 'InnovateCo';
}

// Fallback data generators (dynamic based on user idea)
function generateFallbackConversation(idea: string) {
  const name = generateStartupName(idea);
  
  return [
    {
      role: 'CEO',
      content: `Excellent concept! "${idea}" addresses a genuine market gap. For ${name}, we need to establish clear competitive advantages and focus on sustainable growth strategies.`,
      timestamp: Date.now(),
    },
    {
      role: 'Designer',
      content: `From a UX perspective for ${name}, I envision a clean, intuitive interface. We should prioritize mobile-first design and ensure accessibility is built in from day one.`,
      timestamp: Date.now() + 1500,
    },
    {
      role: 'Engineer',
      content: `The technical implementation for "${idea}" is definitely feasible. I recommend a modern stack - Next.js frontend, Node.js backend, PostgreSQL database. We can have an MVP ready in 8-12 weeks.`,
      timestamp: Date.now() + 3000,
    },
    {
      role: 'Marketer',
      content: `${name} has strong market potential. Our go-to-market strategy should leverage content marketing, SEO, and strategic partnerships. Social media and community building will be crucial for early traction.`,
      timestamp: Date.now() + 4500,
    },
    {
      role: 'CFO',
      content: `Based on preliminary analysis for ${name}, we're looking at approximately $120-150K in startup costs with a monthly burn rate around $20-25K. I project we can reach breakeven within 12-15 months with proper execution.`,
      timestamp: Date.now() + 6000,
    },
  ];
}

function generateFallbackMasterSpec(idea: string) {
  const name = generateStartupName(idea);
  const keywords = extractKeywords(idea);
  
  return {
    startup: {
      name: name,
      tagline: `${keywords[0] || 'Innovation'} made simple`,
      problem: `Users currently lack an efficient solution for ${keywords.join(', ')}`,
      solution: idea,
      target_audience: 'Early adopters and tech-savvy professionals aged 25-45',
    },
    product: {
      features: [
        `Core ${keywords[0] || 'functionality'} engine`,
        'Intuitive user interface',
        'Real-time synchronization',
        'Analytics and insights dashboard',
        'Mobile and web applications',
      ],
      tech_stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Redis'],
      mvp_timeline: '10-12 weeks',
    },
    business: {
      revenue_model: 'Freemium with premium subscription tiers',
      pricing: 'Free tier, $19/month Pro, $79/month Enterprise',
      competitors: ['Traditional solutions', 'Legacy platforms', 'Manual processes'],
    },
    marketing: {
      channels: ['Content Marketing', 'SEO', 'Social Media', 'Product Hunt', 'Partnerships'],
      messaging: `${name} - ${keywords[0] || 'Transform'} your workflow with intelligent automation`,
      launch_strategy: 'Beta launch with early adopters, followed by Product Hunt and press outreach',
    },
    financials: {
      startup_costs: 130000,
      monthly_burn: 22000,
      revenue_projections: Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        revenue: Math.round(i * i * 1200 + i * 3000),
        costs: 22000,
      })),
    },
  };
}

function generateFallbackLandingPage(idea: string) {
  const name = generateStartupName(idea);
  const keywords = extractKeywords(idea);
  
  return {
    hero: {
      headline: `Transform Your ${keywords[0] || 'Business'} with ${name}`,
      subheadline: idea,
      cta: 'Start Free Trial',
    },
    features: [
      {
        title: 'Smart Automation',
        description: `Automate your ${keywords[0] || 'workflow'} with intelligent AI-powered features`,
        icon: 'Zap',
      },
      {
        title: 'Real-Time Insights',
        description: 'Get instant analytics and actionable insights to make better decisions',
        icon: 'TrendingUp',
      },
      {
        title: 'Seamless Integration',
        description: 'Connect with your existing tools and workflows effortlessly',
        icon: 'Link',
      },
    ],
    testimonials: [
      {
        quote: `${name} completely transformed how we handle ${keywords[0] || 'our operations'}. Highly recommended!`,
        author: 'Alex Johnson',
        role: 'CEO, TechCorp',
      },
      {
        quote: 'The ROI was immediate. We saved 15 hours per week within the first month.',
        author: 'Sarah Chen',
        role: 'Operations Manager',
      },
    ],
    pricing: [
      {
        tier: 'Free',
        price: '$0/month',
        features: ['Basic features', 'Up to 100 items', 'Email support', 'Community access'],
      },
      {
        tier: 'Pro',
        price: '$19/month',
        features: ['All Free features', 'Unlimited items', 'Priority support', 'Advanced analytics', 'API access'],
      },
      {
        tier: 'Enterprise',
        price: '$79/month',
        features: ['All Pro features', 'Custom integrations', 'Dedicated support', 'SLA guarantee', 'White-label options'],
      },
    ],
  };
}

function generateFallbackPitchDeck(idea: string) {
  const name = generateStartupName(idea);
  const keywords = extractKeywords(idea);
  
  return {
    slides: [
      {
        title: name,
        content: `# ${name}\n\n${idea}\n\n*Revolutionizing ${keywords[0] || 'the industry'}*`,
        type: 'title',
      },
      {
        title: 'The Problem',
        content: `## Current challenges in ${keywords[0] || 'the market'}\n\n- Existing solutions are outdated and inefficient\n- Manual processes waste time and resources\n- Lack of integration causes data silos\n- High costs prevent widespread adoption\n\n**There must be a better way**`,
        type: 'problem',
      },
      {
        title: 'Our Solution',
        content: `## ${name}: ${idea}\n\n- Automated ${keywords[0] || 'workflow'} management\n- Intelligent AI-powered insights\n- Seamless integrations with existing tools\n- Affordable pricing for all business sizes\n- Real-time collaboration features`,
        type: 'solution',
      },
      {
        title: 'Market Opportunity',
        content: `## Multi-Billion Dollar Market\n\n- Growing demand for ${keywords[0] || 'automation'} solutions\n- 500M+ potential users worldwide\n- Market growing at 25% CAGR\n- Shift to digital-first operations\n- Increasing enterprise adoption`,
        type: 'market',
      },
      {
        title: 'Business Model',
        content: `## Freemium + Enterprise\n\n- Free tier for user acquisition\n- $19/month Pro subscription\n- $79/month Enterprise plan\n- Target: 50K users by Year 1\n- $5M ARR by Year 2`,
        type: 'business',
      },
      {
        title: 'Traction',
        content: `## Early Validation\n\n- MVP launched and tested\n- 500+ beta waitlist signups\n- Positive user feedback (4.8/5 rating)\n- 3 pilot customers confirmed\n- Strong engagement metrics`,
        type: 'traction',
      },
      {
        title: 'Competition',
        content: `## Competitive Advantage\n\n**Our Edge:**\n- Modern, intuitive interface\n- AI-powered automation\n- Better pricing (50% cheaper)\n- Faster implementation\n- Superior customer support`,
        type: 'competition',
      },
      {
        title: 'Go-to-Market',
        content: `## Launch Strategy\n\n**Phase 1:** Beta launch (Month 1-2)\n**Phase 2:** Product Hunt launch (Month 3)\n**Phase 3:** Content marketing & SEO (Ongoing)\n**Phase 4:** Enterprise sales (Month 6+)\n\nChannels: Digital ads, partnerships, community`,
        type: 'marketing',
      },
      {
        title: 'Team',
        content: `## Experienced Founders\n\n- **CEO:** 10 years in ${keywords[0] || 'tech'}\n- **CTO:** Former engineering lead at major tech company\n- **CPO:** Product expert with 3 successful exits\n- **Advisors:** Industry veterans from leading companies`,
        type: 'team',
      },
      {
        title: 'The Ask',
        content: `## Raising $500K Seed Round\n\n**Use of Funds:**\n- Product development: 50%\n- Marketing & sales: 30%\n- Operations & hiring: 20%\n\n**Milestones:**\n- Launch public beta (Month 3)\n- Reach 10K users (Month 6)\n- $500K ARR (Month 12)`,
        type: 'ask',
      },
    ],
  };
}

function generateFallbackMarketing(idea: string) {
  const name = generateStartupName(idea);
  const keywords = extractKeywords(idea);
  
  return {
    tweets: [
      `🚀 Excited to announce ${name}! We're transforming ${keywords[0] || 'the industry'} with intelligent automation.\n\n${idea}\n\nJoin our beta → [link]\n\n#startup #${keywords[0] || 'innovation'} #AI`,
      `Tired of manual ${keywords[0] || 'processes'}? 😅\n\n${name} automates everything:\n✅ Save 15+ hours/week\n✅ Real-time insights\n✅ Seamless integrations\n✅ Free to start\n\nTry it now → [link]`,
      `The future of ${keywords[0] || 'work'} is here.\n\n${name} uses AI to:\n→ Automate repetitive tasks\n→ Provide actionable insights\n→ Integrate with your tools\n\nJoin 1000+ early adopters → [link]\n\n#productivity #automation`,
    ],
    linkedin_post: `🎯 Introducing ${name}\n\nAfter months of development, we're thrilled to launch ${name} - ${idea}\n\n💡 The Problem:\nBusinesses waste countless hours on manual ${keywords[0] || 'processes'}, leading to inefficiency and missed opportunities.\n\n🚀 Our Solution:\n${name} combines intelligent automation with powerful analytics to transform how teams work.\n\n📊 Key Features:\n→ AI-powered workflow automation\n→ Real-time analytics dashboard\n→ Seamless tool integrations\n→ Enterprise-grade security\n\n🎁 Special Offer:\nWe're offering free access to our beta program for the first 100 signups.\n\n👉 Learn more: [link]\n\n#Innovation #Automation #Startup #${keywords[0] || 'Technology'}`,
    email_sequence: [
      `Subject: Welcome to ${name}! 🚀\n\nHi there!\n\nWelcome to ${name} - we're excited to have you on board!\n\n${idea}\n\nHere's what you can do right now:\n1. Complete your profile setup (2 minutes)\n2. Connect your first integration\n3. Explore our automation templates\n\nNeed help? Our team is here for you.\n\nBest regards,\nThe ${name} Team\n\nP.S. Check out our quick start guide → [link]`,
      `Subject: Getting the most out of ${name}\n\nHey!\n\nHope you're enjoying ${name} so far. We wanted to share some tips to help you maximize your results:\n\n💡 Pro Tip #1: Set up automation rules to save time\n💡 Pro Tip #2: Use our analytics to track key metrics\n💡 Pro Tip #3: Integrate with your existing tools\n\nReady to upgrade? Pro users get:\n→ Unlimited automations\n→ Advanced analytics\n→ Priority support\n→ API access\n\nUpgrade now → [link]`,
      `Subject: You're making great progress!\n\nHi,\n\nWe've noticed you've been actively using ${name} - that's awesome!\n\nYour stats so far:\n✓ 15 hours saved\n✓ 50+ tasks automated\n✓ 3 integrations connected\n\nWant to take it to the next level? Our Pro plan unlocks:\n→ Unlimited everything\n→ Advanced features\n→ Dedicated support\n\nClaim your 30% launch discount → [link]\n\nThanks for being an early adopter!\n\nBest,\nThe ${name} Team`,
    ],
    ad_copy: [
      {
        platform: 'Google Ads',
        headline: `${name} - Automate Your ${keywords[0] || 'Workflow'}`,
        body: `Save 15+ hours per week with intelligent automation. Free trial, no credit card required. Join 1000+ teams already using ${name}.`,
      },
      {
        platform: 'Facebook Ads',
        headline: `Stop Wasting Time on Manual ${keywords[0] || 'Tasks'}`,
        body: `${name} automates your workflow so you can focus on what matters. AI-powered, easy to use, affordable pricing. Start free today!`,
      },
      {
        platform: 'LinkedIn Ads',
        headline: `Enterprise ${keywords[0] || 'Automation'} Platform`,
        body: `Trusted by leading companies. ${name} delivers ROI in weeks, not months. Schedule a demo to see how we can transform your operations.`,
      },
    ],
  };
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, type } = await request.json();

    // Check if API key is configured
    const hasApiKey = !!process.env.ANTHROPIC_API_KEY;

    if (type === 'masterSpec') {
      // Extract the user's idea from the prompt
      const ideaMatch = prompt.match(/The startup idea is: ["'](.*)["']/);
      const userIdea = ideaMatch ? ideaMatch[1] : 'innovative startup solution';

      if (!hasApiKey) {
        // Return dynamic fallback data based on user's idea
        console.log('No API key - using fallback data for:', userIdea);
        return NextResponse.json({
          conversation: generateFallbackConversation(userIdea),
          masterSpec: generateFallbackMasterSpec(userIdea),
        });
      }

      try {
        // Make real API call
        const message = await anthropic.messages.create({
          model: 'claude-sonnet-4-5-20250929',
          max_tokens: 4096,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        });

        const responseText = extractTextFromResponse(message.content);

        if (!responseText) {
          console.error('Empty response from Claude API');
          return NextResponse.json({
            conversation: generateFallbackConversation(userIdea),
            masterSpec: generateFallbackMasterSpec(userIdea),
          });
        }

        // Extract conversation and JSON spec
        const conversationMatch = responseText.match(/<conversation>([\s\S]*?)<\/conversation>/);
        const specMatch = responseText.match(/<master_spec>([\s\S]*?)<\/master_spec>/);

        const conversation = conversationMatch ? conversationMatch[1].trim() : '';
        const specJson = specMatch ? specMatch[1].trim() : '';

        // Parse conversation into messages
        const messages = [];
        const messageRegex = /\*\*\[(.*?)\]\*\*:\s*([\s\S]*?)(?=\*\*\[|$)/g;
        let match;
        let index = 0;

        while ((match = messageRegex.exec(conversation)) !== null) {
          messages.push({
            role: match[1],
            content: match[2].trim(),
            timestamp: Date.now() + (index * 1500),
          });
          index++;
        }

        // If no messages parsed, use fallback
        if (messages.length === 0) {
          console.warn('No conversation messages parsed, using fallback');
          return NextResponse.json({
            conversation: generateFallbackConversation(userIdea),
            masterSpec: generateFallbackMasterSpec(userIdea),
          });
        }

        // Parse master spec
        let masterSpec;
        try {
          masterSpec = specJson ? JSON.parse(specJson) : generateFallbackMasterSpec(userIdea);
        } catch (parseError) {
          console.error('Failed to parse master spec JSON:', parseError);
          masterSpec = generateFallbackMasterSpec(userIdea);
        }

        return NextResponse.json({
          conversation: messages,
          masterSpec: masterSpec,
        });
      } catch (apiError) {
        console.error('Claude API call failed:', apiError);
        return NextResponse.json({
          conversation: generateFallbackConversation(userIdea),
          masterSpec: generateFallbackMasterSpec(userIdea),
        });
      }
    }

    // For landing page, pitch deck, and marketing
    if (type === 'landingPage' || type === 'pitchDeck' || type === 'marketing') {
      // Extract user idea from the master spec in the prompt
      const specMatch = prompt.match(/\{[\s\S]*"startup"[\s\S]*"solution":\s*"([^"]*)"[\s\S]*\}/);
      const userIdea = specMatch ? specMatch[1] : 'innovative solution';

      if (!hasApiKey) {
        // Return dynamic fallback data
        console.log(`No API key - using fallback ${type} for:`, userIdea);
        
        if (type === 'landingPage') {
          return NextResponse.json(generateFallbackLandingPage(userIdea));
        }
        if (type === 'pitchDeck') {
          return NextResponse.json(generateFallbackPitchDeck(userIdea));
        }
        if (type === 'marketing') {
          return NextResponse.json(generateFallbackMarketing(userIdea));
        }
      }

      try {
        const message = await anthropic.messages.create({
          model: 'claude-sonnet-4-5-20250929',
          max_tokens: 3072,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        });

        const responseText = extractTextFromResponse(message.content);

        if (!responseText) {
          console.error('Empty response from Claude API');
          if (type === 'landingPage') return NextResponse.json(generateFallbackLandingPage(userIdea));
          if (type === 'pitchDeck') return NextResponse.json(generateFallbackPitchDeck(userIdea));
          if (type === 'marketing') return NextResponse.json(generateFallbackMarketing(userIdea));
        }

        // Extract JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            return NextResponse.json(JSON.parse(jsonMatch[0]));
          } catch (parseError) {
            console.error('Failed to parse JSON:', parseError);
            if (type === 'landingPage') return NextResponse.json(generateFallbackLandingPage(userIdea));
            if (type === 'pitchDeck') return NextResponse.json(generateFallbackPitchDeck(userIdea));
            if (type === 'marketing') return NextResponse.json(generateFallbackMarketing(userIdea));
          }
        }

        // No JSON found, use fallback
        if (type === 'landingPage') return NextResponse.json(generateFallbackLandingPage(userIdea));
        if (type === 'pitchDeck') return NextResponse.json(generateFallbackPitchDeck(userIdea));
        if (type === 'marketing') return NextResponse.json(generateFallbackMarketing(userIdea));

      } catch (apiError) {
        console.error('Claude API call failed:', apiError);
        if (type === 'landingPage') return NextResponse.json(generateFallbackLandingPage(userIdea));
        if (type === 'pitchDeck') return NextResponse.json(generateFallbackPitchDeck(userIdea));
        if (type === 'marketing') return NextResponse.json(generateFallbackMarketing(userIdea));
      }
    }

    return NextResponse.json({ error: 'Unknown type' }, { status: 400 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';