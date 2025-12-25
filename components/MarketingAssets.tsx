'use client'

import { MarketingAssets as MarketingAssetsType } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Twitter, Linkedin, Mail, Megaphone, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface MarketingAssetsProps {
  data?: MarketingAssetsType
  isLoading?: boolean
}

export default function MarketingAssets({ data, isLoading }: MarketingAssetsProps) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(id)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Crafting marketing assets...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <Card className="p-8 text-center text-gray-500">
        <p>Marketing assets will be generated after the master spec is complete</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tweets */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Twitter className="w-5 h-5 text-blue-400" />
            <CardTitle>Tweet Templates</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.tweets.map((tweet, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 relative">
              <p className="text-gray-800 whitespace-pre-wrap mb-3">{tweet}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{tweet.length} / 280 characters</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(tweet, `tweet-${index}`)}
                >
                  {copiedIndex === `tweet-${index}` ? (
                    <>
                      <Check className="w-4 h-4 mr-1 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* LinkedIn Post */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-blue-700" />
            <CardTitle>LinkedIn Post</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-4 relative">
            <p className="text-gray-800 whitespace-pre-wrap mb-3">{data.linkedin_post}</p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyToClipboard(data.linkedin_post, 'linkedin')}
            >
              {copiedIndex === 'linkedin' ? (
                <>
                  <Check className="w-4 h-4 mr-1 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Sequence */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-green-600" />
            <CardTitle>Email Sequence</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.email_sequence.map((email, index) => (
            <div key={index} className="border-l-4 border-green-600 bg-gray-50 rounded-r-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-semibold text-gray-600">Email {index + 1}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(email, `email-${index}`)}
                >
                  {copiedIndex === `email-${index}` ? (
                    <>
                      <Check className="w-4 h-4 mr-1 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <p className="text-gray-800 whitespace-pre-wrap">{email}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Ad Copy */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-purple-600" />
            <CardTitle>Ad Copy</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.ad_copy.map((ad, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 relative">
              <div className="flex justify-between items-start mb-3">
                <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {ad.platform}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(`${ad.headline}\n\n${ad.body}`, `ad-${index}`)}
                >
                  {copiedIndex === `ad-${index}` ? (
                    <>
                      <Check className="w-4 h-4 mr-1 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{ad.headline}</h4>
              <p className="text-gray-700">{ad.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}