'use client'

import Link from 'next/link'

const activities = [
  {
    id: 1,
    user: 'Sarah',
    action: 'shared a milestone',
    time: '30 min ago',
    avatar: 'S',
    avatarBg: 'bg-pink-100 text-pink-600',
  },
  {
    id: 2,
    user: 'James',
    action: 'joined the Yoga group',
    time: '1 hour ago',
    avatar: 'J',
    avatarBg: 'bg-blue-100 text-blue-600',
  },
  {
    id: 3,
    user: 'Marcus',
    action: 'posted a question',
    time: '2 hours ago',
    avatar: 'M',
    avatarBg: 'bg-emerald-100 text-emerald-600',
  },
]

export function CommunityActivity() {
  return (
    <div className="rounded-2xl bg-[var(--surface-card)] p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Community</h3>
        <Link 
          href="/community" 
          className="text-xs font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>
      
      <div className="mt-4 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${activity.avatarBg}`}>
              {activity.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity.user}</span>{' '}
                <span className="text-muted-foreground">{activity.action}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
