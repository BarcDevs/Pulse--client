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
        isLoading
    } = useCheckInStats()
    const stats = statsResponse?.data
    const statsData = buildStatsData(stats)

    return (
        <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
            {statsData.map((stat) => {
                if (isLoading) {
                    return (
                        <StatCardSkeleton key={stat.label}/>
                    )
                }

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
                        icon={
                            <Icon className={cn(
                                'size-6',
                                style.iconColor
                            )}/>
                        }
                        iconBg={style.iconBg}
                        descriptionColor={style.descriptionColor}
                    />
                )
            })}
        </div>
    )
}
