'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { StartupData } from '@/lib/types'
import { PROMPTS } from '@/lib/prompts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import AgentTheater from '@/components/AgentTheatre'
import LandingPagePreview from '@/components/LandingPagePreview'
import PitchDeck from '@/components/PitchDeck'
import Financials from '@/components/Financials'
import MarketingAssets from '@/components/MarketingAssets'
import JsonSpec from '@/components/JsonSpec'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function Dashboard() {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('agents')
  const [startupData, setStartupData] = useState<StartupData>({
    idea: '',
    conversation: [],
    status: 'idle',
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Get the idea from session storage
    const idea = sessionStorage.getItem('startupIdea')
    if (!idea) {
      router.push('/')
      return
    }

    setStartupData(prev => ({ ...prev, idea }))
    
    // Start the generation process
    generateAll(idea)
  }, [mounted, router])

  const callClaude = async (prompt: string, type: string) => {
    const response = await fetch('/api/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, type }),
    })

    if (!response.ok) {
      throw new Error('Failed to call Claude API')
    }

    return response.json()
  }

  const generateAll = async (idea: string) => {
  try {
    // Step 1: Generate Master Spec with streaming conversation
    setStartupData(prev => ({ ...prev, status: 'generating_spec' }))
    const masterSpecResult = await callClaude(PROMPTS.masterSpec(idea), 'masterSpec')
    
    // Stream messages one by one
    if (masterSpecResult.conversation && Array.isArray(masterSpecResult.conversation)) {
      for (let i = 0; i < masterSpecResult.conversation.length; i++) {
        await delay(750); // Delay between messages for dramatic effect
        setStartupData(prev => ({
          ...prev,
          conversation: [...masterSpecResult.conversation.slice(0, i + 1)],
        }));
      }
    }
    
    // Set the master spec after conversation
    await delay(500);
    setStartupData(prev => ({
      ...prev,
      masterSpec: masterSpecResult.masterSpec,
    }))

    // Step 2: Generate Landing Page
    setStartupData(prev => ({ ...prev, status: 'generating_landing' }))
    const landingPageResult = await callClaude(
      PROMPTS.landingPage(JSON.stringify(masterSpecResult.masterSpec)),
      'landingPage'
    )
    
    setStartupData(prev => ({
      ...prev,
      landingPage: landingPageResult,
    }))

    // Step 3: Generate Pitch Deck
    setStartupData(prev => ({ ...prev, status: 'generating_pitch' }))
    const pitchDeckResult = await callClaude(
      PROMPTS.pitchDeck(JSON.stringify(masterSpecResult.masterSpec)),
      'pitchDeck'
    )
    
    setStartupData(prev => ({
      ...prev,
      pitchDeck: pitchDeckResult,
    }))

    // Step 4: Generate Marketing Assets
    setStartupData(prev => ({ ...prev, status: 'generating_marketing' }))
    const marketingResult = await callClaude(
      PROMPTS.marketing(JSON.stringify(masterSpecResult.masterSpec)),
      'marketing'
    )
    
    setStartupData(prev => ({
      ...prev,
      marketingAssets: marketingResult,
      status: 'complete',
    }))

  } catch (error) {
    console.error('Error generating startup data:', error)
    alert('Failed to generate startup data. Please try again.')
  }
}


  const getStatusBadge = () => {
    const statusMap = {
      idle: { label: 'Starting...', variant: 'secondary' as const },
      generating_spec: { label: 'Generating Spec', variant: 'default' as const },
      generating_landing: { label: 'Creating Landing Page', variant: 'default' as const },
      generating_pitch: { label: 'Building Pitch Deck', variant: 'default' as const },
      generating_financials: { label: 'Calculating Financials', variant: 'default' as const },
      generating_marketing: { label: 'Crafting Marketing', variant: 'default' as const },
      complete: { label: 'Complete', variant: 'secondary' as const },
    }

    const status = statusMap[startupData.status]
    return <Badge variant={status.variant}>{status.label}</Badge>
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="glass-effect border-b border-purple-500/20 sticky top-0 z-10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/')}
                className="text-purple-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  Startup-in-a-Box
                </h1>
                <p className="text-sm text-gray-400 mt-1">{startupData.idea}</p>
              </div>
            </div>
            {getStatusBadge()}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 glass-effect">
            <TabsTrigger value="agents">Agent Theater</TabsTrigger>
            <TabsTrigger value="landing">Landing Page</TabsTrigger>
            <TabsTrigger value="pitch">Pitch Deck</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="spec">Master Spec</TabsTrigger>
          </TabsList>

          <TabsContent value="agents">
            <AgentTheater 
              messages={startupData.conversation}
              isLoading={startupData.status === 'generating_spec'}
            />
          </TabsContent>

          <TabsContent value="landing">
            <LandingPagePreview 
              data={startupData.landingPage}
              isLoading={startupData.status === 'generating_landing'}
            />
          </TabsContent>

          <TabsContent value="pitch">
            <PitchDeck 
              data={startupData.pitchDeck}
              isLoading={startupData.status === 'generating_pitch'}
            />
          </TabsContent>

          <TabsContent value="financials">
            <Financials 
              data={startupData.masterSpec}
              isLoading={startupData.status === 'generating_financials'}
            />
          </TabsContent>

          <TabsContent value="marketing">
            <MarketingAssets 
              data={startupData.marketingAssets}
              isLoading={startupData.status === 'generating_marketing'}
            />
          </TabsContent>

          <TabsContent value="spec">
            <JsonSpec 
              data={startupData.masterSpec}
              isLoading={startupData.status === 'generating_spec'}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}