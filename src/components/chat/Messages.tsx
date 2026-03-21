'use client'

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import {
    CHAT_MESSAGES_ASSISTANT_LABEL,
    CHAT_MESSAGES_YOU_LABEL,
} from '@/constants/chatTexts'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  suggestions?: string[]
}

type ChatMessagesProps = {
  messages: Message[]
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className={'flex-1 overflow-y-auto p-4 md:p-6'}>
      <div className={'mx-auto max-w-3xl space-y-6'}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3',
              message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            {/* Avatar */}
            <Avatar className={'size-9 shrink-0'}>
              {message.role === 'assistant' ? (
                <>
                  <AvatarImage src={'/ai-avatar.png'} />
                  <AvatarFallback className={'bg-primary text-white'}>
                    AI
                  </AvatarFallback>
                </>
              ) : (
                <>
                  <AvatarImage src={'/avatars/alex.jpg'} />
                  <AvatarFallback className={'bg-primary-light text-primary'}>
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
                  ? 'bg-primary text-white'
                  : 'bg-surface-card text-foreground shadow-sm'
              )}
            >
              <p className={'whitespace-pre-wrap text-sm leading-relaxed'}>
                {message.content}
              </p>

              {/* Suggestions */}
              {message.suggestions && (
                <div className={'mt-3 flex flex-wrap gap-2'}>
                  {message.suggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant={'outline'}
                      size={'sm'}
                      className={'h-auto rounded-full border-primary bg-transparent px-3 py-1.5 text-xs text-primary hover:bg-primary-light'}
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
                    : 'text-muted-foreground'
                )}
              >
                {message.role === 'assistant'
                  ? CHAT_MESSAGES_ASSISTANT_LABEL
                  : CHAT_MESSAGES_YOU_LABEL}
                {' - '}
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { ChatMessages }
