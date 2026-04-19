'use client'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'

import { buildStatsData } from '@/lib/stats/buildStatsData'
import { cn } from '@/lib/utils'

import {
    dashboardStatsIconMap,
    dashboardStatsStyleMap
} from '@/constants/mappings/dashboard'

import { StatCard } from './StatCard'
import { StatCardSkeleton } from './StatCardSkeleton'

export const DashboardStatsCards = () => {
    const {
        data: statsResponse,
        isLoading,
        isError
    } = useCheckInStats()
    const stats = statsResponse
    const statsData = buildStatsData(stats)
    const displayStats = isError
        ? statsData.map((stat) => ({
            ...stat,
            value: '-',
            subValue: '-'
        }))
        : statsData

    return (
        <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
            {displayStats.map((stat) => {
                if (isLoading)
                    return <StatCardSkeleton key={stat.label}/>

                const style = dashboardStatsStyleMap[
                    stat.label as keyof typeof dashboardStatsStyleMap
                    ]
                const Icon = dashboardStatsIconMap[
                    stat.label as keyof typeof dashboardStatsIconMap
                    ]

                return (
                    <StatCard
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                        subValue={stat.subValue}
                        description={stat.description}
                        icon={<Icon className={cn(
                            'size-6',
                            style.iconColor
                        )}/>}
                        iconBg={style.iconBg}
                        descriptionColor={style.descriptionColor}
                    />
                )
            })}
        </div>
    )
}
