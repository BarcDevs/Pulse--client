'use client'

import { BookOpen } from 'lucide-react'

interface JournalEntryProps {
  value: string
  onChange: (value: string) => void
}

export function JournalEntry({ value, onChange }: JournalEntryProps) {
  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-accent" />
        <span className="font-medium text-foreground">Journal Entry</span>
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="How are you really feeling? Any small victories or challenges today?"
        className="w-full h-32 px-4 py-3 rounded-xl bg-[var(--surface-section)] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none text-sm leading-relaxed"
      />
    </div>
  )
}
