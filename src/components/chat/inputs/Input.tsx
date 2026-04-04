'use client'

import { KeyboardEvent } from 'react'

import type { SetState } from '@/types/utils/react'

import { ChatSuggestionsPanel } from '../suggestions/ChatSuggestionsPanel'

import { ChatInputField } from './ChatInputField'

type ChatInputProps = {
    value: string
    onChangeAction: SetState<string>
    onSendAction: () => void
}

export const ChatInput = ({
    value,
    onChangeAction,
    onSendAction
}: ChatInputProps) => {
    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSendAction()
        }
    }

    return (
        <div className={'border-t border-border bg-surface-card p-4'}>
            <div className={'mx-auto max-w-3xl'}>
                <ChatSuggestionsPanel onSuggestionClick={onChangeAction}/>
                <ChatInputField
                    value={value}
                    onChange={onChangeAction}
                    onSend={onSendAction}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    )
}
