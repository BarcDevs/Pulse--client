import {cn} from '@/lib/utils'

import {dashboardStatsWithIcons} from '@/constants/mappings/dashboard'

import {StatCard} from './StatCard'

export const DashboardStatsCards = () => (
    <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
        {dashboardStatsWithIcons.map((stat) => (
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
