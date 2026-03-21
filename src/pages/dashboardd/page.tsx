'use client'

import {AppHeader} from '@/components/AppHeader'
import {DashboardAIInsight} from '@/components/dashboard/AiInsight'
import {DashboardCheckInCard} from '@/components/dashboard/CheckInCard'
import {DashboardCommunity} from '@/components/dashboard/Community'
import {DashboardStatsCards} from '@/components/dashboard/StatsCards'
import {DashboardTodaysFocus} from '@/components/dashboard/TodaysFocus'
import {DashboardWeeklyChart} from '@/components/dashboard/WeeklyChart'
import {SidebarProvider} from '@/components/ui/sidebar'

import {
    DASHBOARD_SUBTITLE,
    DASHBOARD_TITLE,
} from '@/constants/dashboardTexts'

const DashboardPage = () => (
    <SidebarProvider>
        <div className={'flex min-h-screen flex-col'}>
            <AppHeader
                title={DASHBOARD_TITLE}
                subtitle={DASHBOARD_SUBTITLE}
            />

            <main className={'flex-1 p-4 md:p-6'}>
                <div className={'mx-auto max-w-7xl'}>
                    <div
                        className={
                            'mb-6 grid gap-6 ' +
                            'lg:grid-cols-[1fr_320px]'
                        }
                    >
                        <DashboardCheckInCard />
                        <DashboardTodaysFocus />
                    </div>

                    <DashboardStatsCards />

                    <div
                        className={
                            'mt-6 grid gap-6 ' +
                            'lg:grid-cols-[1fr_320px]'
                        }
                    >
                        <DashboardWeeklyChart />
                        <div
                            className={
                                'flex flex-col gap-6'
                            }
                        >
                            <DashboardAIInsight />
                            <DashboardCommunity />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </SidebarProvider>
)

export {DashboardPage as default}
