'use client'

import { useState } from 'react'

import { Mic,Paperclip, Send } from 'lucide-react'

import { Button } from '@/components/ui/Button'

export function ChatInput() {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      console.log('Sending:', message)
      setMessage('')
    }
  }

  return (
    <div className="border-t border-border bg-[var(--surface-card)] p-4">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
          AR
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Alex River</p>
          <p className="text-xs text-muted-foreground">Day 42 of Journey</p>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-2 bg-[var(--surface-section)] rounded-full px-4 py-2">
          <button type="button" className="p-1 text-muted-foreground hover:text-foreground">
            <Paperclip className="h-5 w-5" />
          </button>
          
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          
          <button type="button" className="p-1 text-muted-foreground hover:text-foreground">
            <Mic className="h-5 w-5" />
          </button>
          
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 rounded-full bg-primary hover:bg-primary/90"
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
