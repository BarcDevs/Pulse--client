'use client'

import { AppHeader } from '@/components/AppHeader'
import { DashboardAIInsight } from '@/components/dashboard/AiInsight'
import { DashboardCheckInCard } from '@/components/dashboard/CheckInCard'
import { DashboardCommunity } from '@/components/dashboard/Community'
import { DashboardStatsCards } from '@/components/dashboard/StatsCards'
import { DashboardTodaysFocus } from '@/components/dashboard/TodaysFocus'
import { DashboardWeeklyChart } from '@/components/dashboard/WeeklyChart'

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader title="Dashboard" subtitle="Welcome back, Alex" />

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          {/* Top Section - Check-in CTA and Today's Focus */}
          <div className="mb-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            <DashboardCheckInCard />
            <DashboardTodaysFocus />
          </div>

          {/* Stats Cards */}
          <DashboardStatsCards />

          {/* Middle Section - Chart and AI Insight */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            <DashboardWeeklyChart />
            <div className="flex flex-col gap-6">
              <DashboardAIInsight />
              <DashboardCommunity />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
