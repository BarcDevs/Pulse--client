'use client'

import { Send } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
}

const suggestions = [
  'How can I improve my sleep?',
  'Suggest a 5-min stretching routine',
  'Recovery-friendly meal ideas',
]

export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="border-t border-[var(--border)] bg-[var(--surface-card)] p-4">
      <div className="mx-auto max-w-3xl">
        {/* Suggestions */}
        <div className="mb-3">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
            SUGGESTED FOR YOU
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onChange(suggestion)}
                className="rounded-full border border-[var(--border)] bg-[var(--surface-card)] px-3 py-1.5 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-3">
          <Avatar className="size-9 shrink-0">
            <AvatarImage src="/avatars/alex.jpg" />
            <AvatarFallback className="bg-[var(--primary-light)] text-[var(--primary)]">
              AR
            </AvatarFallback>
          </Avatar>
          <div className="relative flex-1">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="w-full rounded-full border border-[var(--border)] bg-[var(--muted)] px-4 py-3 pr-12 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
            />
            <Button
              onClick={onSend}
              size="icon"
              className="absolute right-1.5 top-1/2 size-8 -translate-y-1/2 rounded-full bg-[var(--primary)] hover:bg-[var(--primary)]/90"
            >
              <Send className="size-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
