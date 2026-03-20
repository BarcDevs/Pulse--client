'use client'

import { useState } from 'react'

import { ArrowUpRight,TrendingUp } from 'lucide-react'

import { cn } from '@/lib/utils'

export function BehavioralPatterns() {
  const [activeTab, setActiveTab] = useState<'7days' | '30days'>('30days')

  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Behavioral Patterns</h3>
        <div className="flex gap-1 rounded-lg bg-[var(--surface-section)] p-1">
          <button
            onClick={() => setActiveTab('7days')}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              activeTab === '7days'
                ? 'bg-[var(--surface-card)] text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            7 Days
          </button>
          <button
            onClick={() => setActiveTab('30days')}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              activeTab === '30days'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            30 Days
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Correlation Card */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Correlation
            </span>
            <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
          </div>
          <h4 className="text-base font-medium text-foreground">
            Social Interaction vs. Stress
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You report 23% lower stress levels on days when you participate in community group chats.
          </p>
          {/* Mini bar chart */}
          <div className="flex items-end gap-1 h-12 mt-2">
            {[40, 65, 50, 80, 45, 70, 55].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/20 rounded-t"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        {/* Observation Card */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Observation
            </span>
          </div>
          <h4 className="text-base font-medium text-foreground">
            Morning Routine Impact
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Completing a Daily Check-In before 9:00 AM leads to a 30% higher chance of reaching all daily recovery goals.
          </p>
          <div className="mt-4">
            <div className="text-3xl font-bold text-foreground">82%</div>
            <p className="text-xs text-muted-foreground">Success rate when daily</p>
          </div>
        </div>

        {/* AI Prediction Card */}
        <div className="rounded-xl bg-primary p-5 text-primary-foreground">
          <span className="text-xs font-medium uppercase tracking-wider opacity-80">
            AI Prediction
          </span>
          <h4 className="mt-2 text-base font-medium">
            Projected Recovery Path
          </h4>
          <p className="mt-2 text-sm opacity-80 leading-relaxed">
            If current adherence maintains, you are on track to increase your range of motion by 8% next week.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <TrendingUp className="h-4 w-4" />
            High Confidence Analytics
          </div>
        </div>
      </div>
    </div>
  )
}
