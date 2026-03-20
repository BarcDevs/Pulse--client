'use client'

import { Moon, Settings2,Sun } from 'lucide-react'

const activities = [
  {
    id: 1,
    icon: Sun,
    title: 'Morning Routine',
    subtitle: 'Scheduled for 07:30 AM',
    tags: ['Meditation', 'Stretch'],
  },
  {
    id: 2,
    icon: Moon,
    title: 'Evening Reflection',
    subtitle: 'Scheduled for 09:00 PM',
    tags: ['Journaling', 'Breathwork'],
  },
]

export function DailyActivityPreferences() {
  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Daily Activity Preferences</h3>
        <button className="p-2 rounded-lg hover:bg-[var(--surface-section)] transition-colors">
          <Settings2 className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-[var(--surface-section)]"
          >
            <div className="h-12 w-12 rounded-xl bg-[var(--surface-card)] flex items-center justify-center">
              <activity.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{activity.title}</h4>
              <p className="text-sm text-muted-foreground">{activity.subtitle}</p>
            </div>
            <div className="flex gap-2">
              {activity.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[var(--surface-card)] text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
