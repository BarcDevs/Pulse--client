'use client'

import { TrendingUp } from 'lucide-react'

export function WellnessScore() {
  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Weekly Wellness Average
          </p>
          <h3 className="mt-1 text-xl font-semibold text-foreground">
            Stable & Improving
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">
          Last week vs. this week
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase">Mood</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-foreground">6.2</span>
            <span className="text-muted-foreground">/ 10</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-secondary text-sm">
            <TrendingUp className="h-3 w-3" />
            trending_flat
          </div>
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground uppercase">Pain</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-foreground">7.8</span>
            <span className="text-muted-foreground">/ 10</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-secondary text-sm">
            <TrendingUp className="h-3 w-3" />
            improved
          </div>
        </div>
      </div>
    </div>
  )
}
