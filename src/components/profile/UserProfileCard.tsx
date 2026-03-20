'use client'

import { Award } from 'lucide-react'

export function UserProfileCard() {
  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6 text-center">
      {/* Avatar */}
      <div className="relative mx-auto w-24 h-24 mb-4">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center border-4 border-primary/20">
          <span className="text-3xl font-semibold text-primary">AR</span>
        </div>
        <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-success flex items-center justify-center border-2 border-[var(--surface-card)]">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Name */}
      <h2 className="text-xl font-semibold text-foreground">Alex Rivera</h2>
      <p className="text-sm text-muted-foreground mt-1">Member since Oct 2023</p>

      {/* Level Badge */}
      <div className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
        <Award className="h-4 w-4" />
        Level 4: Resilient
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div>
          <p className="text-2xl font-bold text-foreground">142</p>
          <p className="text-xs text-muted-foreground">Days</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">28</p>
          <p className="text-xs text-muted-foreground">Miles Toned</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">8.4</p>
          <p className="text-xs text-muted-foreground">Health Score</p>
        </div>
      </div>
    </div>
  )
}
