import {Card, CardContent} from '@/components/ui/card'

import {cn} from '@/lib/utils'

import {DASHBOARD_STATS_WITH_ICONS} from '@/constants/dashboardMaps'

export const DashboardStatsCards = () => (
    <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
        {DASHBOARD_STATS_WITH_ICONS.map((stat) => (
            <Card key={stat.label} className={'border-0 shadow-sm'}>
                <CardContent className={'pt-6'}>
                    <div className={'flex items-center gap-4'}>
                        <div className={cn('flex size-12 shrink-0 items-center justify-center rounded-xl', stat.iconBg)}>
                            <stat.icon className={cn('size-6', stat.iconColor)}/>
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
                            <p className={cn('text-sm', stat.descriptionColor || 'text-muted-foreground')}>
                                {stat.description}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
