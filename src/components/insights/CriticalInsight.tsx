'use client'

import { AlertTriangle, BarChart3 } from 'lucide-react'

import { Button } from '@/components/ui/Button'

export function CriticalInsight() {
  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
          <AlertTriangle className="h-3 w-3" />
          Critical Insight
        </span>
      </div>
      
      <h2 className="text-2xl font-bold text-foreground leading-tight">
        Your mood improves by 15% on days including mobility stretching.
      </h2>
      
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Our analysis shows a direct correlation between your 8 AM stretching routine and peak afternoon energy levels.
      </p>
      
      <div className="mt-6 flex items-center gap-3">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Schedule Stretch
        </Button>
        <Button variant="ghost" className="text-muted-foreground">
          <BarChart3 className="mr-2 h-4 w-4" />
          View Data Correlation
        </Button>
      </div>
    </div>
  )
}
