'use client'

import {useState} from 'react'

import {initialChatMessages} from '@/mocks/chatMessages'

import {ChatInput} from './inputs/Input'
import {ChatMessages} from './messages/Messages'
import {ChatPanel} from './ChatPanel'

export const ChatPageContent = () => {
    const [messages, setMessages] = useState(initialChatMessages)
    const [inputValue, setInputValue] = useState('')

    const handleSend = () => {
        if (!inputValue.trim())
            return

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
        <div className={'flex h-[calc(100vh-4rem)]'}>
            <div className={'flex-1 flex flex-col'}>
                <ChatMessages messages={messages}/>
                <ChatInput
                    value={inputValue}
                    onChangeAction={setInputValue}
                    onSendAction={handleSend}
                />
            </div>

            <ChatPanel/>
        </div>
    )
}