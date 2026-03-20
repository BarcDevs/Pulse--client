import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

const communityUpdates = [
  {
    name: 'Sarah',
    action: 'shared a milestone',
    time: '30 minutes ago',
    avatar: 'S',
  },
  {
    name: 'James',
    action: 'joined the Yoga group',
    time: '1 hour ago',
    avatar: 'J',
  },
  {
    name: 'Marcus',
    action: 'posted a question',
    time: '2 hours ago',
    avatar: 'M',
    avatarBg: 'bg-[var(--secondary)]',
  },
]

export function DashboardCommunity() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Community</CardTitle>
        <Link
          href="/community"
          className="text-sm font-medium text-[var(--primary)] hover:underline"
        >
          VIEW ALL
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {communityUpdates.map((update, index) => (
            <div key={index} className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarImage src={`/avatars/${update.name.toLowerCase()}.jpg`} />
                <AvatarFallback
                  className={`${update.avatarBg || 'bg-[var(--primary)]'} text-white`}
                >
                  {update.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm text-[var(--foreground)]">
                  <span className="font-medium">{update.name}</span>{' '}
                  {update.action}
                </p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {update.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
