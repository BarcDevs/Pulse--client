import {cn} from '@/lib/utils'

import {
    CHAT_MESSAGES_ASSISTANT_LABEL,
    CHAT_MESSAGES_YOU_LABEL
} from '@/constants/chatTexts'

import {MessageSuggestions} from './MessageSuggestions'

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
    suggestions,
}: MessageBubbleProps) => (
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

        {suggestions &&
            <MessageSuggestions suggestions={suggestions}/>
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
                ? CHAT_MESSAGES_ASSISTANT_LABEL
                : CHAT_MESSAGES_YOU_LABEL}
            {' - '}
            {timestamp}
        </p>
    </div>
)
