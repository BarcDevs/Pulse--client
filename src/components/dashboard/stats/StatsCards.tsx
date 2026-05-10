'use client'

import { useTranslations } from 'next-intl'

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
    const t = useTranslations()
    const statsData = buildStatsData(statsResponse)
    const displayStats = isError
        ? statsData.map((stat) => ({
            ...stat,
            value: '-',
            subValue: '',
            subValueKey: ''
        }))
        : statsData

    return (
        <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
            {displayStats.map((stat) => {
                if (isLoading)
                    return <StatCardSkeleton key={stat.labelKey}/>

                const style = dashboardStatsStyleMap[stat.id]
                const Icon = dashboardStatsIconMap[stat.id]

                return (
                    <StatCard
                        key={stat.id}
                        label={t(stat.labelKey)}
                        value={stat.value}
                        subValue={stat.subValueKey 
                            ? t(stat.subValueKey)
                            : stat.subValue || undefined}
                        description={stat.descriptionKey 
                            ? t(
                                stat.descriptionKey, 
                                stat.descriptionParams
                            ) : ''}
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
