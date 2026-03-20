'use client'

import { Sparkles } from 'lucide-react'

export function AIInsightCard() {
  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-5">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-accent" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          AI Insight
        </span>
      </div>
      
      <p className="mt-3 text-sm text-foreground leading-relaxed">
        &quot;Your mood is <span className="font-semibold text-secondary">20% higher</span> on days you stretch. Consider adding a short session tonight.&quot;
      </p>
      
      <button className="mt-3 text-xs font-medium text-primary hover:underline">
        View All Insights
      </button>
    </div>
  )
}
