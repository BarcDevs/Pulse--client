'use client'

import { Award,Calendar } from 'lucide-react'

export function ProgressStats() {
  return (
    <div className="lg:col-span-2 grid grid-cols-2 gap-4">
      {/* Current Streak */}
      <div className="rounded-2xl bg-[var(--surface-card)] p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Current Streak
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">12</span>
              <span className="text-lg text-muted-foreground">days</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Personal best: <span className="text-secondary font-medium">lock_fire_rnprince.txt, 24 days</span>
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center">
            <Calendar className="h-6 w-6 text-warning" />
          </div>
        </div>
      </div>

      {/* Total Milestones */}
      <div className="rounded-2xl bg-[var(--surface-card)] p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Milestones
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">5</span>
              <span className="text-lg text-muted-foreground">badges</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Next: <span className="text-primary font-medium">Mind/Body Precision, 6 days</span>
            </p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center">
            <Award className="h-6 w-6 text-accent" />
          </div>
        </div>
      </div>
    </div>
  )
}
