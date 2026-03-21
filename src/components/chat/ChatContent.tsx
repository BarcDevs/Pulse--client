'use client'

import {useState} from 'react'

import {CHAT_MESSAGES_DEFAULT} from '@/constants/chatTexts'

import {ChatInput} from './Input'
import {ChatMessages} from './Messages'
import {ChatSidebar} from './Sidebar'

export const ChatContent = () => {
    const [messages] = useState(CHAT_MESSAGES_DEFAULT)
    const [inputValue, setInputValue] = useState('')

    const handleSend = () => {
        if (inputValue.trim()) {
            setInputValue('')
        }
    }

    return (
        <div className={'flex h-[calc(100vh-4rem)]'}>
            <div className={'flex-1 flex flex-col'}>
                <ChatMessages messages={messages} />
                <ChatInput
                    value={inputValue}
                    onChange={setInputValue}
                    onSend={handleSend}
                />
            </div>

            <div
                className={
                    'w-80 border-l border-border ' +
                    'bg-surface-card p-4 ' +
                    'overflow-y-auto hidden lg:block'
                }
            >
                <ChatSidebar />
            </div>
        </div>
    )
}