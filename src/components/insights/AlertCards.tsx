'use client'

import { AlertTriangle, Lightbulb } from 'lucide-react'

import { Button } from '@/components/ui/Button'

export function AlertCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pain Trend Alert */}
      <div className="rounded-2xl bg-destructive/5 border border-destructive/20 p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Pain Trend Alert</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Slightly higher pain levels recorded today compared to your 7-day average. Your sleep quality was also 12% lower last night.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-medium text-destructive">Attention Required</span>
              <button className="text-xs text-primary hover:underline">
                Update Journal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Step */}
      <div className="rounded-2xl bg-secondary/5 border border-secondary/20 p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-secondary/10">
            <Lightbulb className="h-5 w-5 text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Actionable Step</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Try 10 minutes of restorative yoga today to manage pain and improve evening relaxation before your next sleep cycle.
            </p>
            <div className="mt-4">
              <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Start Session Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
