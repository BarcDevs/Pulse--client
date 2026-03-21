'use client'

import {useState} from 'react'

import {Shield} from 'lucide-react'

import {ChatPanel} from '@/components/chat/ChatPanel'
import {ChatInput} from '@/components/chat/Input'
import {ChatMessages} from '@/components/chat/Messages'
import {Badge} from '@/components/ui/badge'

import * as ChatTexts from '@/constants/chatTexts'

const ChatPage = () => {
    const [messages, setMessages] = useState([
        {
            id: '1',
            role: 'assistant' as const,
            content: ChatTexts.CHAT_OPENING_MESSAGE,
            timestamp: '08:30 AM'
        },
        {
            id: '2',
            role: 'user' as const,
            content: ChatTexts.CHAT_EXAMPLE_USER_RESTLESSNESS,
            timestamp: '08:32 AM'
        },
        {
            id: '3',
            role: 'assistant' as const,
            content: ChatTexts.CHAT_AI_RESPONSE_1,
            timestamp: '08:33 AM',
            suggestions: ChatTexts.CHAT_SUGGESTIONS
        },
        {
            id: '4',
            role: 'user' as const,
            content: ChatTexts.CHAT_AI_RESPONSE_2,
            timestamp: '08:35 AM'
        }
    ])

    const [inputValue, setInputValue] = useState('')

    const handleSend = () => {
        if (!inputValue.trim()) return

        const newMessage = {
            id: Date.now().toString(),
            role: 'user' as const,
            content: inputValue,
            timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })
        }

        setMessages([...messages, newMessage])
        setInputValue('')
    }

    return (
        <div className={'flex min-h-screen flex-col'}>
            <header className={'sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-surface-card px-4 md:px-6'}>
                <div className={'flex items-center gap-4'}>
                    <div>
                        <h1 className={'text-lg font-semibold text-foreground'}>
                            {ChatTexts.CHAT_PAGE_TITLE}
                        </h1>
                        <p className={'text-sm text-muted-foreground'}>
                            {ChatTexts.CHAT_PAGE_SUBTITLE}
                        </p>
                    </div>
                </div>
                <Badge className={'gap-2 bg-secondary-light text-secondary'}>
                    <Shield className={'size-3'}/>
                    {ChatTexts.CHAT_BADGE}
                </Badge>
            </header>

            <div className={'flex flex-1 overflow-hidden'}>
                {/* Main Chat Area */}
                <div className={'flex flex-1 flex-col'}>
                    <ChatMessages messages={messages}/>
                    <ChatInput
                        value={inputValue}
                        onChange={setInputValue}
                        onSend={handleSend}
                    />
                </div>

                {/* Right Panel */}
                <ChatPanel/>
            </div>
        </div>
    )
}

export default ChatPage
