'use client'

import { Message } from '@/lib/types'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Users, TrendingUp, Code, Palette, DollarSign } from 'lucide-react'

const AGENT_AVATARS: Record<string, { icon: any; color: string; bg: string }> = {
  CEO: { icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
  Designer: { icon: Palette, color: 'text-pink-600', bg: 'bg-pink-100' },
  Engineer: { icon: Code, color: 'text-green-600', bg: 'bg-green-100' },
  Marketer: { icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100' },
  CFO: { icon: DollarSign, color: 'text-yellow-600', bg: 'bg-yellow-100' },
}

interface AgentTheaterProps {
  messages: Message[]
  isLoading?: boolean
}

export default function AgentTheater({ messages, isLoading }: AgentTheaterProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Agent Theater</h2>
        {isLoading && (
          <Badge variant="secondary">
            <span className="animate-pulse">Agents discussing...</span>
          </Badge>
        )}
      </div>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {messages.length === 0 && !isLoading ? (
          <Card className="p-8 text-center text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Agent conversation will appear here...</p>
          </Card>
        ) : (
          messages.map((message, index) => {
            const agent = AGENT_AVATARS[message.role as keyof typeof AGENT_AVATARS]
            const Icon = agent?.icon || Users

            return (
              <div
                key={index}
                className="flex gap-3 opacity-0 animate-fade-in"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${agent?.bg || 'bg-gray-100'} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${agent?.color || 'text-gray-600'}`} />
                </div>
                <Card className="flex-1 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">{message.role}</span>
                    <Badge variant="outline" className="text-xs">
                      {new Date(message.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </Badge>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{message.content}</p>
                </Card>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}