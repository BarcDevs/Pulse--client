'use client'

import { PenLine } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Textarea } from '@/components/ui/Textarea'

interface CheckInJournalProps {
  value: string
  onChange: (value: string) => void
}

export function CheckInJournal({ value, onChange }: CheckInJournalProps) {
  return (
    <Card className="mt-6 border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <PenLine className="size-5 text-[var(--primary)]" />
          <CardTitle className="text-lg font-semibold">Journal Entry</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="How are you really feeling? Any small victories or challenges today?"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[120px] resize-none border-[var(--border)] bg-[var(--surface-card)] placeholder:text-[var(--muted-foreground)]"
        />
      </CardContent>
    </Card>
  )
}
