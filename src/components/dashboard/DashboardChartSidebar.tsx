import {DashboardAIInsight} from './AiInsight'
import {CommunityActivity} from './CommunityActivity'
import {DashboardWeeklyChart} from './WeeklyChart'

export const DashboardChartSidebar = () => (
    <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
        <div className={'lg:col-span-2 space-y-6'}>
            <DashboardWeeklyChart/>
        </div>
        <div className={'space-y-6'}>
            <DashboardAIInsight/>
            <CommunityActivity/>
        </div>
    </div>
)