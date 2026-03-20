'use client'

import { Bell, History,Share2, Shield } from 'lucide-react'

const settings = [
  {
    icon: Shield,
    title: 'Security',
    subtitle: 'Last updated 14 days',
  },
  {
    icon: Bell,
    title: 'Notifications',
    subtitle: 'Push enabled',
  },
  {
    icon: Share2,
    title: 'Data Sharing',
    subtitle: 'Clinician view On',
  },
  {
    icon: History,
    title: 'Login History',
    subtitle: 'San Francisco, CA',
  },
]

export function SystemPrivacy() {
  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">System & Privacy</h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {settings.map((setting) => (
          <button
            key={setting.title}
            className="flex flex-col items-center p-4 rounded-xl bg-[var(--surface-section)] hover:bg-[var(--surface-section)]/80 transition-colors text-center"
          >
            <div className="h-12 w-12 rounded-xl bg-[var(--surface-card)] flex items-center justify-center mb-3">
              <setting.icon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h4 className="text-sm font-medium text-foreground">{setting.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{setting.subtitle}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
