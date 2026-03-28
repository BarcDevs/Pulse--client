'use client'

import {cn} from '@/lib/utils'

import {MessageAvatar} from './MessageAvatar'
import {MessageBubble} from './MessageBubble'

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

export const ChatMessages = ({
    messages
}: ChatMessagesProps) => (
    <div className={'flex-1 overflow-y-auto p-4 md:p-6'}>
        <div className={'mx-auto max-w-3xl space-y-6'}>
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={cn(
                        'flex gap-3',
                        message.role === 'user' ?
                            'flex-row-reverse' :
                            'flex-row'
                    )}
                >
                    <MessageAvatar role={message.role}/>

                    <MessageBubble
                        role={message.role}
                        content={message.content}
                        timestamp={message.timestamp}
                        suggestions={message.suggestions}
                    />
                </div>
            ))}
        </div>
    </div>
)
