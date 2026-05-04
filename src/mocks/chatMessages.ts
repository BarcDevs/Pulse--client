import { chatLocales } from '@/locales/chatLocales'

type ChatMessage = {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: string
    suggestions?: string[]
}

export const chatMessageLocales = {
    openingMessage: chatLocales.messages.openingMessage,
    exampleUserRestlessness: chatLocales.messages.exampleUserRestlessness,
    aiResponse1: chatLocales.messages.aiResponse1,
    suggestions: chatLocales.messages.suggestions,
    aiResponse2: chatLocales.messages.aiResponse2
}

export const initialChatMessages: ChatMessage[] = [
    {
        id: '1',
        role: 'assistant',
        content: chatMessageLocales.openingMessage,
        timestamp: '08:30 AM'
    },
    {
        id: '2',
        role: 'user',
        content: chatMessageLocales.exampleUserRestlessness,
        timestamp: '08:32 AM'
    },
    {
        id: '3',
        role: 'assistant',
        content: chatMessageLocales.aiResponse1,
        timestamp: '08:33 AM',
        suggestions: [chatMessageLocales.suggestions]
    },
    {
        id: '4',
        role: 'user',
        content: chatMessageLocales.aiResponse2,
        timestamp: '08:35 AM'
    }
]
