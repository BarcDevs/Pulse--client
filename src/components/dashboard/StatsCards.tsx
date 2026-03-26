import {cn} from '@/lib/utils'

import {DASHBOARD_STATS_WITH_ICONS} from '@/constants/dashboardMaps'

import {StatCard} from './StatCard'

export const DashboardStatsCards = () => (
    <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
        {DASHBOARD_STATS_WITH_ICONS.map((stat) => (
            <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                subValue={stat.subValue}
                description={stat.description}
                icon={
                    <stat.icon className={cn(
                        'size-6',
                        stat.iconColor
                    )}/>
                }
                iconBg={stat.iconBg}
                descriptionColor={stat.descriptionColor}
            />
        ))}
    </div>
)
