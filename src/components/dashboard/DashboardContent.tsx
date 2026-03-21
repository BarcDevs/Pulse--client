'use client'

import { DashboardAIInsight } from './AiInsight'
import { DashboardCheckInCard } from './CheckInCard'
import { CommunityActivity } from './CommunityActivity'
import { DashboardStatsCards } from './StatsCards'
import { DashboardTodaysFocus } from './TodaysFocus'
import { DashboardWeeklyChart } from './WeeklyChart'

export const DashboardContent = () => (
  <div className={'p-6 space-y-6'}>
    {/* Top Row - Check-in CTA and Today's Focus */}
    <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
      <div className={'lg:col-span-2'}>
        <DashboardCheckInCard />
      </div>
      <div>
        <DashboardTodaysFocus />
      </div>
    </div>

    {/* Stats Cards Row */}
    <DashboardStatsCards />

    {/* Bottom Row - Chart and Sidebar */}
    <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
      <div className={'lg:col-span-2 space-y-6'}>
        <DashboardWeeklyChart />
      </div>
      <div className={'space-y-6'}>
        <DashboardAIInsight />
        <CommunityActivity />
      </div>
    </div>
  </div>
)
