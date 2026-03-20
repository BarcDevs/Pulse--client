'use client'

import { Sparkles, X } from 'lucide-react'

import { Button } from '@/components/ui/Button'

export function RecoveryInsight() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] p-6 text-primary-foreground">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-medium">Recovery Insight</span>
        </div>
        <button className="p-1 hover:bg-white/10 rounded">
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <h3 className="mt-4 text-xl font-semibold">
        Your pain levels are dropping concurrently with improved sleep consistency.
      </h3>
      
      <p className="mt-3 text-primary-foreground/80 text-sm leading-relaxed">
        Data suggests that the 30-minute meditation you started 4 days ago is having a 12% positive impact on your morning mood scores. Keep this routine!
      </p>
      
      <div className="mt-6 flex items-center gap-3">
        <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
          Keep Onex
        </Button>
        <Button variant="ghost" className="text-primary-foreground hover:bg-white/10">
          Acknowledge
        </Button>
      </div>
    </div>
  )
}
