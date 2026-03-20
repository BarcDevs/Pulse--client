import { Brain, Heart, Lock,Rocket } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

const milestones = [
  {
    icon: Rocket,
    title: 'First Step',
    description: 'Completed first check-in',
    achieved: true,
    iconBg: 'bg-[var(--primary-light)]',
    iconColor: 'text-[var(--primary)]',
  },
  {
    icon: Heart,
    title: '7-Day Streak',
    description: 'Checked in for 7 days',
    achieved: true,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
  },
  {
    icon: Brain,
    title: 'Mind Master',
    description: '30-Day Clarity',
    achieved: true,
    iconBg: 'bg-[var(--accent-light)]',
    iconColor: 'text-[var(--accent)]',
  },
  {
    icon: Lock,
    title: '1 Month Active',
    description: 'Coming soon',
    achieved: false,
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-400',
  },
]

export function ProgressMilestones() {
  return (
    <Card className="mt-6 border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Milestones & Achievements</CardTitle>
        <span className="text-sm text-[var(--muted-foreground)]">See All 15</span>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((milestone) => (
            <div
              key={milestone.title}
              className={`flex flex-col items-center rounded-xl p-6 text-center ${
                milestone.achieved ? 'bg-[var(--surface-section)]' : 'bg-[var(--muted)] opacity-60'
              }`}
            >
              <div
                className={`flex size-12 items-center justify-center rounded-xl ${milestone.iconBg}`}
              >
                <milestone.icon className={`size-6 ${milestone.iconColor}`} />
              </div>
              <h4 className="mt-3 font-semibold text-[var(--foreground)]">
                {milestone.title}
              </h4>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
