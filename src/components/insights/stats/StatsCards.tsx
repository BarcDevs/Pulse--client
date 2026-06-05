import { CardContent } from '@/components/ui/card'

import { INSIGHTS_STATS } from '@/config/insightsStats'

import { StatCard } from './StatCard'

export const StatsCards = () => (
    <CardContent>
        <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
            {INSIGHTS_STATS.map((stat) => (
                <StatCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    trend={stat.trend}
                    description={stat.description}
                    trendColor={stat.trendColor}
                />
            ))}
        </div>
    </CardContent>
)
