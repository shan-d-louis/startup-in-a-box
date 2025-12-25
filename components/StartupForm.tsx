'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Rocket, Sparkles } from 'lucide-react'

export default function StartupForm() {
  const [idea, setIdea] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!idea.trim()) return

    setIsLoading(true)
    
    // Store the idea in session storage
    sessionStorage.setItem('startupIdea', idea)
    
    // Navigate to dashboard
    router.push('/dashboard')
  }

  const examples = [
    'An AI-powered meal planning app that creates grocery lists based on dietary restrictions',
    'A platform connecting remote workers with co-working spaces in their area',
    'A sustainability tracker that gamifies reducing carbon footprint',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Rocket className="w-16 h-16 text-blue-600" />
              <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-2 -right-2" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Startup-in-a-Box
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Transform your startup idea into a complete business plan with AI-powered agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
                What's your startup idea?
              </label>
              <Textarea
                id="idea"
                placeholder="Describe your startup idea in a few sentences..."
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="min-h-[150px] resize-none"
                disabled={isLoading}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm font-medium text-blue-900 mb-2">Need inspiration? Try these:</p>
              <div className="space-y-2">
                {examples.map((example, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setIdea(example)}
                    className="block w-full text-left text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-100 rounded p-2 transition-colors"
                    disabled={isLoading}
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={!idea.trim() || isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⚙️</span>
                  Launching your startup...
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5 mr-2" />
                  Build My Startup
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Our AI agents will create:</p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {['Master Spec', 'Landing Page', 'Pitch Deck', 'Financials', 'Marketing Assets'].map((item) => (
                <span key={item} className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}