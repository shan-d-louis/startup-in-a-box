'use client'

import { useState } from 'react'
import { PitchDeck as PitchDeckType } from '@/lib/types'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight, Download, Sparkles } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

interface PitchDeckProps {
  data?: PitchDeckType
  isLoading?: boolean
}

export default function PitchDeck({ data, isLoading }: PitchDeckProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Creating pitch deck...</p>
        </div>
      </div>
    )
  }

  if (!data || !data.slides || data.slides.length === 0) {
    return (
      <Card className="p-8 text-center text-gray-400">
        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>Pitch deck will be generated after the master spec is complete</p>
      </Card>
    )
  }

  const currentSlideData = data.slides[currentSlide]

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < data.slides.length - 1 ? prev + 1 : prev))
  }

  const handleDownload = () => {
    const content = data.slides
      .map((slide) => `# ${slide.title}\n\n${slide.content}\n\n---\n`)
      .join('\n')
    
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pitch-deck.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getSlideGradient = (index: number) => {
    const gradients = [
      'from-purple-600 via-pink-600 to-purple-700',
      'from-blue-600 via-purple-600 to-pink-600',
      'from-indigo-600 via-purple-600 to-pink-600',
      'from-violet-600 via-purple-600 to-fuchsia-600',
      'from-purple-700 via-indigo-600 to-blue-600',
    ]
    return gradients[index % gradients.length]
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 font-mono">
            Slide {currentSlide + 1} / {data.slides.length}
          </span>
          <div className="h-2 w-32 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / data.slides.length) * 100}%` }}
            />
          </div>
        </div>
        <Button onClick={handleDownload} variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download Deck
        </Button>
      </div>

      <Card className="min-h-[600px] relative overflow-hidden group">
        <div className={`absolute inset-0 bg-gradient-to-br ${getSlideGradient(currentSlide)} opacity-90`}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        </div>

        <CardContent className="relative z-10 p-16 h-full flex flex-col justify-center">
          {currentSlide === 0 ? (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="inline-block">
                <Sparkles className="w-16 h-16 text-yellow-300 animate-float mx-auto mb-6" />
              </div>
              <h1 className="text-7xl font-black text-white mb-6 tracking-tight">
                {currentSlideData.title}
              </h1>
              <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
              <div className="prose prose-invert prose-lg max-w-none mt-8">
                <ReactMarkdown className="text-white/90 text-2xl">
                  {currentSlideData.content}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-6xl font-bold text-white mb-4">
                  {currentSlideData.title}
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full"></div>
              </div>

              <div className="prose prose-invert prose-xl max-w-none">
                <ReactMarkdown 
                  className="text-white/95"
                  components={{
                    h2: ({node, ...props}) => <h2 className="text-4xl font-bold text-white mb-6 mt-8" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-3xl font-semibold text-white/95 mb-4" {...props} />,
                    p: ({node, ...props}) => <p className="text-xl text-white/90 leading-relaxed mb-4" {...props} />,
                    ul: ({node, ...props}) => <ul className="space-y-4 my-6" {...props} />,
                    li: ({node, ...props}) => (
                      <li className="text-xl text-white/90 flex items-start gap-3">
                        <span className="text-yellow-300 text-2xl flex-shrink-0">→</span>
                        <span className="pt-1">{props.children}</span>
                      </li>
                    ),
                    strong: ({node, ...props}) => <strong className="text-yellow-300 font-bold" {...props} />,
                  }}
                >
                  {currentSlideData.content}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </CardContent>

        <div className="absolute bottom-8 right-8 text-white/40 text-sm font-mono z-20">
          #{currentSlide + 1}
        </div>
      </Card>

      <div className="flex justify-between items-center">
        <Button
          onClick={handlePrevious}
          disabled={currentSlide === 0}
          variant="outline"
          size="lg"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          {data.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-12'
                  : 'bg-slate-700 w-2 hover:bg-slate-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          disabled={currentSlide === data.slides.length - 1}
          variant="outline"
          size="lg"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}