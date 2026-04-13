import { chatTexts } from '@/constants/componentTexts/chat'

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
        content: chatTexts.messages.openingMessage,
        timestamp: '08:30 AM'
    },
    {
        id: '2',
        role: 'user',
        content: chatTexts.messages.exampleUserRestlessness,
        timestamp: '08:32 AM'
    },
    {
        id: '3',
        role: 'assistant',
        content: chatTexts.messages.aiResponse1,
        timestamp: '08:33 AM',
        suggestions: chatTexts.messages.suggestions
    },
    {
        id: '4',
        role: 'user',
        content: chatTexts.messages.aiResponse2,
        timestamp: '08:35 AM'
    }
]
