'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { chatLocales } from '@/locales/chatLocales'

import { MessageSuggestions } from '../suggestions/MessageSuggestions'

type MessageBubbleProps = {
    role: 'user' | 'assistant'
    content: string
    timestamp: string
    suggestions?: string[]
}

export const MessageBubble = ({
    role,
    content,
    timestamp,
    suggestions
}: MessageBubbleProps) => {
    const t = useTranslations()

    return (
        <div
            className={cn(
                'max-w-[80%] rounded-2xl px-4 py-3',
                role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-surface-card text-foreground shadow-sm'
            )}
        >
            <p className={'whitespace-pre-wrap text-sm leading-relaxed'}>
                {content}
            </p>

            {suggestions
                && <MessageSuggestions suggestions={suggestions}/>
            }

            <p
                className={cn(
                    'mt-2 text-xs',
                    role === 'user'
                        ? 'text-white/70'
                        : 'text-muted-foreground'
                )}
            >
                {role === 'assistant'
                    ? t(chatLocales.messages.assistantLabel)
                    : t(chatLocales.messages.youLabel)}
                {' - '}
                {timestamp}
            </p>
        </div>
    )
}
