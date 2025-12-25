'use client'

import { LandingPage } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Check, Star } from 'lucide-react'
import * as Icons from 'lucide-react'

interface LandingPagePreviewProps {
  data?: LandingPage
  isLoading?: boolean
}

export default function LandingPagePreview({ data, isLoading }: LandingPagePreviewProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating landing page...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <Card className="p-8 text-center text-gray-500">
        <p>Landing page will be generated after the master spec is complete</p>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-12 text-center">
        <h1 className="text-5xl font-bold mb-4">{data.hero.headline}</h1>
        <p className="text-xl mb-8 opacity-90">{data.hero.subheadline}</p>
        <Button size="lg" variant="secondary">
          {data.hero.cta}
        </Button>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {data.features.map((feature, index) => {
            const IconComponent = (Icons as any)[feature.icon] || Icons.Sparkles
            return (
              <Card key={index}>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      {data.testimonials && data.testimonials.length > 0 && (
        <section className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">What People Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {data.pricing && data.pricing.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.pricing.map((plan, index) => (
              <Card key={index} className={index === 1 ? 'border-blue-600 border-2' : ''}>
                <CardHeader>
                  {index === 1 && (
                    <div className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2">
                      Most Popular
                    </div>
                  )}
                  <CardTitle className="text-2xl">{plan.tier}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={index === 1 ? 'default' : 'outline'}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
