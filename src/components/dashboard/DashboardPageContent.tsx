'use client'

import { useLatestCheckIn } from '@/hooks/queries/useLatestCheckIn'

import { FEATURES } from '@/config/features'

import { DashboardAIInsight } from './cards/AiInsight'
import { DashboardCheckInCard } from './cards/CheckInCard'
import { DashboardDailyReflection } from './cards/DailyReflection'
import { DashboardStatsCards } from './stats/StatsCards'
import { DashboardChartSidebar } from './DashboardChartSidebar'

export const DashboardPageContent = () => {
    const { isTodayCheckInExists } = useLatestCheckIn()

    return (
        <div className={'p-6 space-y-6'}>
            <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6 items-start'}>
                <div className={'lg:col-span-2'}>
                    {!isTodayCheckInExists && (
                        <DashboardCheckInCard/>
                    )}
                    {FEATURES.motivationFeedback && isTodayCheckInExists && (
                        <DashboardAIInsight className={'pt-6 px-10 pb-10 h-full'}/>
                    )}
                </div>
                <DashboardDailyReflection/>
            </div>

            <DashboardStatsCards/>
            <DashboardChartSidebar
                showAIInsight={!isTodayCheckInExists}
            />
        </div>
    )
}
