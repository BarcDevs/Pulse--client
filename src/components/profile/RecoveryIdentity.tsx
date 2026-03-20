'use client'

import { Activity, Brain, Sparkles } from 'lucide-react'

const focusAreas = [
  { icon: Activity, label: 'Pain Management', color: 'bg-destructive/10 text-destructive' },
  { icon: Brain, label: 'Mental Clarity', color: 'bg-secondary/10 text-secondary' },
  { icon: Sparkles, label: 'Mindfulness', color: 'bg-accent/10 text-accent' },
]

export function RecoveryIdentity() {
  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6">
      <h3 className="text-lg font-semibold text-foreground mb-2">Recovery Identity</h3>
      <p className="text-sm text-muted-foreground mb-6">Core Focus Areas</p>

      <div className="flex flex-wrap gap-3 mb-6">
        {focusAreas.map((area) => (
          <div
            key={area.label}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${area.color}`}
          >
            <area.icon className="h-4 w-4" />
            <span className="text-sm font-medium">{area.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-[var(--surface-section)] rounded-xl p-4">
        <p className="text-sm text-muted-foreground italic leading-relaxed">
          &quot;My goal is to regain physical mobility through consistent therapy while maintaining a calm, focused mindset during stressful transitions.&quot;
        </p>
      </div>
    </div>
  )
}
