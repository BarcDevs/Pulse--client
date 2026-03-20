'use client'

import { useState } from 'react'

import { Shield } from 'lucide-react'

import { AppHeader } from '@/components/AppHeader'
import { ChatInput } from '@/components/chat/Input'
import { ChatMessages } from '@/components/chat/Messages'
import { ChatSidebar } from '@/components/chat/Sidebar'
import { Badge } from '@/components/ui/Badge'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant' as const,
      content:
        "Hello Alex, I'm here to support you today. How are you feeling in your recovery journey this morning? Remember, every small step is a victory.",
      timestamp: '08:30 AM',
    },
    {
      id: '2',
      role: 'user' as const,
      content:
        "I'm feeling a bit restless today. I didn't sleep very well last night and it's making me feel slightly anxious.",
      timestamp: '08:32 AM',
    },
    {
      id: '3',
      role: 'assistant' as const,
      content:
        "I understand. Restlessness is a very common part of the process. It's your body and mind finding their new balance.\n\nWould you like to try a short grounding exercise to help with the anxiety, or perhaps we could look at some tips to improve your sleep environment for tonight?",
      timestamp: '08:33 AM',
      suggestions: ['Try grounding exercise', 'Sleep environment tips'],
    },
    {
      id: '4',
      role: 'user' as const,
      content:
        "Let's start with the grounding exercise. I need something to focus on right now.",
      timestamp: '08:35 AM',
    },
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
        minute: '2-digit',
      }),
    }

    setMessages([...messages, newMessage])
    setInputValue('')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[var(--border)] bg-[var(--surface-card)] px-4 md:px-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg font-semibold text-[var(--foreground)]">AI Chat</h1>
            <p className="text-sm text-[var(--muted-foreground)]">Your supportive recovery companion</p>
          </div>
        </div>
        <Badge className="gap-2 bg-[var(--secondary-light)] text-[var(--secondary)]">
          <Shield className="size-3" />
          SAFE SPACE
        </Badge>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col">
          <ChatMessages messages={messages} />
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSend}
          />
        </div>

        {/* Right Sidebar */}
        <ChatSidebar />
      </div>
    </div>
  )
}
