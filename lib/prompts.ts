export const PROMPTS = {
  masterSpec: (idea: string) => `You are a team of startup experts having a strategic discussion. The team consists of:
- CEO: Visionary leader focused on strategy and market fit
- Designer: UX/UI expert focused on user experience
- Engineer: Technical architect focused on feasibility and tech stack
- Marketer: Growth expert focused on go-to-market strategy
- CFO: Financial expert focused on business model and projections

The startup idea is: "${idea}"

Have a realistic conversation where each expert provides their perspective. The conversation should:
1. Analyze the idea critically
2. Identify the core problem and solution
3. Define the target audience
4. Discuss product features and tech stack
5. Establish business model and pricing
6. Plan marketing strategy
7. Project basic financials

Format your response as:
<conversation>
[Each message as: **[Role]**: Message content]
</conversation>

<master_spec>
{
  "startup": {
    "name": "string",
    "tagline": "string",
    "problem": "string",
    "solution": "string",
    "target_audience": "string"
  },
  "product": {
    "features": ["string"],
    "tech_stack": ["string"],
    "mvp_timeline": "string"
  },
  "business": {
    "revenue_model": "string",
    "pricing": "string",
    "competitors": ["string"]
  },
  "marketing": {
    "channels": ["string"],
    "messaging": "string",
    "launch_strategy": "string"
  },
  "financials": {
    "startup_costs": 0,
    "monthly_burn": 0,
    "revenue_projections": [
      {"month": 1, "revenue": 0, "costs": 0}
    ]
  }
}
</master_spec>`,

  landingPage: (spec: string) => `Based on this startup spec:
${spec}

Create a high-converting landing page structure. Return ONLY valid JSON:

{
  "hero": {
    "headline": "string",
    "subheadline": "string",
    "cta": "string"
  },
  "features": [
    {
      "title": "string",
      "description": "string",
      "icon": "string (lucide-react icon name)"
    }
  ],
  "testimonials": [
    {
      "quote": "string",
      "author": "string",
      "role": "string"
    }
  ],
  "pricing": [
    {
      "tier": "string",
      "price": "string",
      "features": ["string"]
    }
  ]
}`,

  pitchDeck: (spec: string) => `Based on this startup spec:
${spec}

Create a 10-slide pitch deck. Return ONLY valid JSON:

{
  "slides": [
    {
      "title": "string",
      "content": "string (markdown format)",
      "type": "title"
    }
  ]
}

Include slides for: Title, Problem, Solution, Market Size, Product, Business Model, Go-to-Market, Traction, Team, and Ask.`,

  financials: (spec: string) => `Based on this startup spec:
${spec}

Expand the financial projections to 24 months with detailed assumptions. Return ONLY valid JSON:

{
  "assumptions": "string",
  "projections": [
    {
      "month": 1,
      "revenue": 0,
      "costs": 0,
      "profit": 0,
      "users": 0,
      "arpu": 0
    }
  ],
  "breakeven_month": 0,
  "funding_needed": 0
}`,

  marketing: (spec: string) => `Based on this startup spec:
${spec}

Create compelling marketing assets. Return ONLY valid JSON:

{
  "tweets": ["string"],
  "linkedin_post": "string",
  "email_sequence": ["string"],
  "ad_copy": [
    {
      "platform": "string",
      "headline": "string",
      "body": "string"
    }
  ]
}`
};
