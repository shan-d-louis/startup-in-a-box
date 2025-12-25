'use client'

import { useState } from 'react'
import { MasterSpec } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Copy, Download, Check, ChevronDown, ChevronRight } from 'lucide-react'

interface JsonSpecProps {
  data?: MasterSpec
  isLoading?: boolean
}

export default function JsonSpec({ data, isLoading }: JsonSpecProps) {
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCopy = async () => {
    if (!data) return
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!data) return
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'startup-spec.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating master specification...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <Card className="p-8 text-center text-gray-500">
        <p>Master specification will appear here</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              Master Specification JSON
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={handleCopy} variant="outline" size="sm">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy JSON
                  </>
                )}
              </Button>
              <Button onClick={handleDownload} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent>
            <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          </CardContent>
        )}
      </Card>

      {/* Structured Display */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Startup Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Startup Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-600">Name</p>
              <p className="text-gray-900">{data.startup.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Tagline</p>
              <p className="text-gray-900">{data.startup.tagline}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Problem</p>
              <p className="text-gray-700">{data.startup.problem}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Solution</p>
              <p className="text-gray-700">{data.startup.solution}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Target Audience</p>
              <p className="text-gray-700">{data.startup.target_audience}</p>
            </div>
          </CardContent>
        </Card>

        {/* Product Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-600">Features</p>
              <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                {data.product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Tech Stack</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {data.product.tech_stack.map((tech, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">MVP Timeline</p>
              <p className="text-gray-700">{data.product.mvp_timeline}</p>
            </div>
          </CardContent>
        </Card>

        {/* Business Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Business Model</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-600">Revenue Model</p>
              <p className="text-gray-700">{data.business.revenue_model}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Pricing</p>
              <p className="text-gray-700">{data.business.pricing}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Competitors</p>
              <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                {data.business.competitors.map((competitor, index) => (
                  <li key={index}>{competitor}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Marketing Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Marketing Strategy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-gray-600">Channels</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {data.marketing.channels.map((channel, index) => (
                  <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                    {channel}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Messaging</p>
              <p className="text-gray-700">{data.marketing.messaging}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">Launch Strategy</p>
              <p className="text-gray-700">{data.marketing.launch_strategy}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
