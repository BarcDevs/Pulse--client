import { Moon,Plus, Sun } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

const activities = [
  {
    icon: Sun,
    title: 'Morning Routine',
    time: 'Scheduled for 07:30 AM',
    tags: ['MEDITATION', 'STRETCH'],
  },
  {
    icon: Moon,
    title: 'Evening Reflection',
    time: 'Scheduled for 09:00 PM',
    tags: ['JOURNALING', 'GRATITUDE'],
  },
]

export function ProfileActivities() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Daily Activity Preferences</CardTitle>
        <Button variant="ghost" size="icon" className="text-[var(--muted-foreground)]">
          <Plus className="size-5" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="flex items-start gap-4 rounded-xl bg-[var(--surface-section)] p-4"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-light)]">
              <activity.icon className="size-5 text-[var(--primary)]" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-[var(--foreground)]">
                {activity.title}
              </h4>
              <p className="text-sm text-[var(--muted-foreground)]">
                {activity.time}
              </p>
            </div>
            <div className="flex flex-wrap gap-1">
              {activity.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-[var(--border)] text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
