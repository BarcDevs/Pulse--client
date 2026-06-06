import type { Metadata } from 'next'

import { ChatPageContent } from '@/components/chat/ChatPageContent'

import { FEATURES } from '@/config/features'
import { createPageMetadata } from '@/config/pagesMetadata'

export const metadata: Metadata = FEATURES.chat
    ? createPageMetadata({
        title: 'Chat - HealEase',
        description: 'Chat with our AI wellness coach for personalized support and guidance.',
        path: '/chat'
    }) : {}

const ChatPage = () => (
    <ChatPageContent/>
)

export default ChatPage
