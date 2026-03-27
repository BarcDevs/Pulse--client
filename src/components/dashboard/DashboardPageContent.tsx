import {DashboardCheckInCard} from './CheckInCard'
import {DashboardChartSidebar} from './DashboardChartSidebar'
import {DashboardStatsCards} from './StatsCards'
import {DashboardTodaysFocus} from './TodaysFocus'

export const DashboardPageContent = () => (
    <div className={'p-6 space-y-6'}>
        <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
            <div className={'lg:col-span-2'}>
                <DashboardCheckInCard/>
            </div>
            <DashboardTodaysFocus/>
        </div>

        <DashboardStatsCards/>
        <DashboardChartSidebar/>
    </div>
)
