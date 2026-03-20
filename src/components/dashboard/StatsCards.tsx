import { Activity,Flame, Smile, TrendingUp } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/Card'

const stats = [
  {
    label: 'MOOD',
    value: '8',
    subValue: '/10',
    description: 'Stable',
    icon: Smile,
    iconColor: 'text-[var(--primary)]',
    iconBg: 'bg-[var(--primary-light)]',
  },
  {
    label: 'PAIN',
    value: '3',
    subValue: '/10',
    description: 'Decreasing',
    descriptionColor: 'text-[var(--secondary)]',
    icon: Activity,
    iconColor: 'text-[var(--destructive)]',
    iconBg: 'bg-red-50',
  },
  {
    label: 'STREAK',
    value: '12',
    subValue: ' days',
    description: 'New record!',
    icon: Flame,
    iconColor: 'text-[var(--warning)]',
    iconBg: 'bg-amber-50',
  },
  {
    label: 'PROGRESS',
    value: '+15',
    subValue: '%',
    description: 'vs. last week',
    icon: TrendingUp,
    iconColor: 'text-[var(--secondary)]',
    iconBg: 'bg-[var(--secondary-light)]',
  },
]

export function DashboardStatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div
                className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <stat.icon className={`size-6 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-[var(--foreground)]">
                  {stat.value}
                  <span className="text-lg font-normal text-[var(--muted-foreground)]">
                    {stat.subValue}
                  </span>
                </p>
                <p
                  className={`text-sm ${stat.descriptionColor || 'text-[var(--muted-foreground)]'}`}
                >
                  {stat.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
