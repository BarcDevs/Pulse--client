import { Bell, History,Share2, Shield } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

const settings = [
  {
    icon: Shield,
    title: 'Security',
    description: 'Last updated 10 days',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Push enabled',
  },
  {
    icon: Share2,
    title: 'Data Sharing',
    description: 'Clinician view On',
  },
  {
    icon: History,
    title: 'Login History',
    description: 'San Francisco, CA',
  },
]

export function ProfileSettings() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">System & Privacy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {settings.map((setting) => (
            <button
              key={setting.title}
              className="flex flex-col items-center rounded-xl bg-[var(--surface-section)] p-6 text-center transition-colors hover:bg-[var(--muted)]"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--primary-light)]">
                <setting.icon className="size-6 text-[var(--primary)]" />
              </div>
              <h4 className="mt-3 font-medium text-[var(--foreground)]">
                {setting.title}
              </h4>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                {setting.description}
              </p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
