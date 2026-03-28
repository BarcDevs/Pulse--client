'use client'

import {KeyboardEvent} from 'react'

import {ChatSuggestionsPanel} from '../suggestions/ChatSuggestionsPanel'

import {ChatInputField} from './ChatInputField'

// todo - fix ts warning
type ChatInputProps = {
    value: string
    onChange: (value: string) => void
    onSend: () => void
}

export const ChatInput = ({
    value,
    onChange,
    onSend
}: ChatInputProps) => {
    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSend()
        }
    }

    return (
        <div className={'border-t border-border bg-surface-card p-4'}>
            <div className={'mx-auto max-w-3xl'}>
                <ChatSuggestionsPanel onSuggestionClick={onChange}/>
                <ChatInputField
                    value={value}
                    onChange={onChange}
                    onSend={onSend}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    )
}
