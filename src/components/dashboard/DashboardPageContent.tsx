'use client'

import { useLatestCheckIn } from '@/hooks/queries/useLatestCheckIn'

import { FEATURES } from '@/config/features'

import { DashboardAIInsight } from './cards/AiInsight'
import { DashboardCheckInCard } from './cards/CheckInCard'
import { DashboardDailyObservation } from './cards/DailyObservation'
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
                        <DashboardAIInsight
                            className={'hidden lg:block pt-6 px-10 pb-10 h-full'}
                            hideButton={true}
                        />
                    )}
                </div>
                <DashboardDailyObservation/>
            </div>

            <DashboardStatsCards/>
            <DashboardChartSidebar
                showAIInsight={!isTodayCheckInExists}
            />
        </div>
    )
}
