'use client'

import {useCheckInStats} from '@/hooks/queries/useCheckInStats'

import {getStatDescription} from '@/lib/stats/getStatDescription'
import {cn} from '@/lib/utils'

import {dashboardPageTexts} from '@/constants/componentTexts/dashboard'
import {
    dashboardStatsIconMap,
    dashboardStatsStyleMap
} from '@/constants/mappings/dashboard'

import {StatCard} from './StatCard'

export const DashboardStatsCards = () => {
    const {data: statsResponse} = useCheckInStats()
    const stats = statsResponse?.data

    const statsData = [
        {
            label: 'MOOD',
            value: stats?.averageMoodScore?.toFixed(1) ??
                dashboardPageTexts.statsCards[0].value,
            subValue: '/10',
            description: stats
                ? getStatDescription('MOOD', stats.averageMoodScore)
                : dashboardPageTexts.statsCards[0].description
        },
        {
            label: 'PAIN',
            value: stats?.averagePainLevel?.toFixed(1) ??
                dashboardPageTexts.statsCards[1].value,
            subValue: '/10',
            description: stats
                ? getStatDescription('PAIN', stats.averagePainLevel)
                : dashboardPageTexts.statsCards[1].description
        },
        {
            label: 'STREAK',
            value: stats?.currentStreak ?? dashboardPageTexts.statsCards[2].value,
            subValue: ' days',
            description: stats
                ? getStatDescription('STREAK', stats.currentStreak, stats.longestStreak)
                : dashboardPageTexts.statsCards[2].description
        },
        {
            label: 'progress',
            value: dashboardPageTexts.statsCards[3].value,
            subValue: dashboardPageTexts.statsCards[3].subValue,
            description: dashboardPageTexts.statsCards[3].description
        }
    ]

    return (
        <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
            {statsData.map((stat) => {
                const style =
                    dashboardStatsStyleMap[
                        stat.label as keyof typeof dashboardStatsStyleMap
                    ]
                const Icon =
                    dashboardStatsIconMap[
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
