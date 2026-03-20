'use client'

import { Button } from '@/components/ui/Button'

const goals = [
  { label: 'Physio Therapy', progress: 80, color: 'bg-primary' },
  { label: 'Daily Meditation', progress: 65, color: 'bg-secondary' },
  { label: 'Sleep Hygiene', progress: 40, color: 'bg-accent' },
]

export function ActiveGoals() {
  return (
    <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
      <h3 className="text-lg font-semibold mb-6">Active Goals</h3>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">{goal.label}</span>
              <span className="text-sm font-medium">{goal.progress}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        className="w-full mt-6 bg-white/20 hover:bg-white/30 text-primary-foreground border-0"
      >
        View Roadmap
      </Button>
    </div>
  )
}
