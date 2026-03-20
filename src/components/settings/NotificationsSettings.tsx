'use client'

import { useState } from 'react'

import { Bell } from 'lucide-react'

export function NotificationsSettings() {
  const [dailyReminder, setDailyReminder] = useState(true)
  const [communityAlerts, setCommunityAlerts] = useState(false)

  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
      </div>

      <div className="space-y-6">
        {/* Daily Reminder */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground">Daily Reminder</h4>
            <p className="text-sm text-muted-foreground">
              Receive a gentle nudge for your recovery check-ins and meditations
            </p>
          </div>
          <button
            onClick={() => setDailyReminder(!dailyReminder)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              dailyReminder ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                dailyReminder ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>

        {/* Community Alerts */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground">Community Alerts</h4>
            <p className="text-sm text-muted-foreground">
              Get notified when someone interacts with your posts or sends support
            </p>
          </div>
          <button
            onClick={() => setCommunityAlerts(!communityAlerts)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              communityAlerts ? 'bg-primary' : 'bg-muted'
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                communityAlerts ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
