'use client'

import { ChatInput } from './ChatInput'
import { ChatMessages } from './ChatMessages'
import { ChatSidebar } from './ChatSidebar'

export function ChatContent() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatMessages />
        <ChatInput />
      </div>

      {/* Sidebar */}
      <div className="w-80 border-l border-border bg-[var(--surface-card)] p-4 overflow-y-auto hidden lg:block">
        <ChatSidebar />
      </div>
    </div>
  )
}
