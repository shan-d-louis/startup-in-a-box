export interface Message {
  role: 'CEO' | 'Designer' | 'Engineer' | 'Marketer' | 'CFO' | 'system';
  content: string;
  timestamp: number;
}

export interface MasterSpec {
  startup: {
    name: string;
    tagline: string;
    problem: string;
    solution: string;
    target_audience: string;
  };
  product: {
    features: string[];
    tech_stack: string[];
    mvp_timeline: string;
  };
  business: {
    revenue_model: string;
    pricing: string;
    competitors: string[];
  };
  marketing: {
    channels: string[];
    messaging: string;
    launch_strategy: string;
  };
  financials: {
    startup_costs: number;
    monthly_burn: number;
    revenue_projections: Array<{
      month: number;
      revenue: number;
      costs: number;
    }>;
  };
}

export interface LandingPage {
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
  }>;
  pricing: Array<{
    tier: string;
    price: string;
    features: string[];
  }>;
}

export interface PitchDeck {
  slides: Array<{
    title: string;
    content: string;
    type: 'title' | 'problem' | 'solution' | 'market' | 'business' | 'team' | 'financials' | 'ask';
  }>;
}

export interface MarketingAssets {
  tweets: string[];
  linkedin_post: string;
  email_sequence: string[];
  ad_copy: Array<{
    platform: string;
    headline: string;
    body: string;
  }>;
}

export interface StartupData {
  idea: string;
  conversation: Message[];
  masterSpec?: MasterSpec;
  landingPage?: LandingPage;
  pitchDeck?: PitchDeck;
  marketingAssets?: MarketingAssets;
  status: 'idle' | 'generating_spec' | 'generating_landing' | 'generating_pitch' | 'generating_financials' | 'generating_marketing' | 'complete';
}