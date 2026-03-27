import * as ChatTexts from '@/constants/chatTexts'

type ChatMessage = {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: string
    suggestions?: string[]
}

export const initialChatMessages: ChatMessage[] = [
    {
        id: '1',
        role: 'assistant',
        content: ChatTexts.CHAT_OPENING_MESSAGE,
        timestamp: '08:30 AM'
    },
    {
        id: '2',
        role: 'user',
        content: ChatTexts.CHAT_EXAMPLE_USER_RESTLESSNESS,
        timestamp: '08:32 AM'
    },
    {
        id: '3',
        role: 'assistant',
        content: ChatTexts.CHAT_AI_RESPONSE_1,
        timestamp: '08:33 AM',
        suggestions: ChatTexts.CHAT_SUGGESTIONS
    },
    {
        id: '4',
        role: 'user',
        content: ChatTexts.CHAT_AI_RESPONSE_2,
        timestamp: '08:35 AM'
    }
]
