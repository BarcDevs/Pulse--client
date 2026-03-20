'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'

import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  suggestions?: string[]
}

interface ChatMessagesProps {
  messages: Message[]
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3',
              message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            {/* Avatar */}
            <Avatar className="size-9 shrink-0">
              {message.role === 'assistant' ? (
                <>
                  <AvatarImage src="/ai-avatar.png" />
                  <AvatarFallback className="bg-[var(--primary)] text-white">
                    AI
                  </AvatarFallback>
                </>
              ) : (
                <>
                  <AvatarImage src="/avatars/alex.jpg" />
                  <AvatarFallback className="bg-[var(--primary-light)] text-[var(--primary)]">
                    AR
                  </AvatarFallback>
                </>
              )}
            </Avatar>

            {/* Message Bubble */}
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-3',
                message.role === 'user'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--surface-card)] text-[var(--foreground)] shadow-sm'
              )}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.content}
              </p>

              {/* Suggestions */}
              {message.suggestions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.suggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      className="h-auto rounded-full border-[var(--primary)] bg-transparent px-3 py-1.5 text-xs text-[var(--primary)] hover:bg-[var(--primary-light)]"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}

              <p
                className={cn(
                  'mt-2 text-xs',
                  message.role === 'user'
                    ? 'text-white/70'
                    : 'text-[var(--muted-foreground)]'
                )}
              >
                {message.role === 'assistant' ? 'ASSISTANT' : 'YOU'} - {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
