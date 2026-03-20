'use client'

import { Trophy } from 'lucide-react'

export function MilestoneCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-accent to-accent/80 p-6 text-accent-foreground h-full">
      <div className="flex items-center justify-between">
        <Trophy className="h-8 w-8 text-accent-foreground/80" />
      </div>
      
      <h3 className="mt-4 text-xl font-semibold">
        Milestone Reached!
      </h3>
      
      <p className="mt-2 text-accent-foreground/80 text-sm leading-relaxed">
        You&apos;ve logged 10 consecutive days! Consistency is the foundation of lasting recovery.
      </p>
      
      <div className="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5 text-xs font-medium">
        Gold Streak Level 1
      </div>
    </div>
  )
}
