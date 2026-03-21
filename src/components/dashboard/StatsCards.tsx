import { Activity, Flame, Smile, TrendingUp } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

import { DASHBOARD_STATS_CARDS } from '@/constants/dashboardTexts'

const iconMap = {
    MOOD: Smile,
    PAIN: Activity,
    STREAK: Flame,
    PROGRESS: TrendingUp,
}

const styleMap = {
    MOOD: {
        iconColor: 'text-primary',
        iconBg: 'bg-primary-light',
        descriptionColor: undefined,
    },
    PAIN: {
        descriptionColor: 'text-secondary',
        iconColor: 'text-destructive',
        iconBg: 'bg-red-50',
    },
    STREAK: {
        iconColor: 'text-warning',
        iconBg: 'bg-amber-50',
        descriptionColor: undefined,
    },
    PROGRESS: {
        iconColor: 'text-secondary',
        iconBg: 'bg-secondary-light',
        descriptionColor: undefined,
    },
}

const stats = DASHBOARD_STATS_CARDS.map((stat) => ({
    ...stat,
    icon: iconMap[stat.label as keyof typeof iconMap],
    ...styleMap[stat.label as keyof typeof styleMap],
}))

export const DashboardStatsCards = () => (
  <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
    {stats.map((stat) => (
      <Card key={stat.label} className={'border-0 shadow-sm'}>
        <CardContent className={'pt-6'}>
          <div className={'flex items-center gap-4'}>
            <div
              className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
            >
              <stat.icon className={`size-6 ${stat.iconColor}`} />
            </div>
            <div>
              <p className={'text-xs font-medium uppercase tracking-wider text-muted-foreground'}>
                {stat.label}
              </p>
              <p className={'text-2xl font-bold text-foreground'}>
                {stat.value}
                <span className={'text-lg font-normal text-muted-foreground'}>
                  {stat.subValue}
                </span>
              </p>
              <p
                className={`text-sm ${stat.descriptionColor || 'text-muted-foreground'}`}
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
