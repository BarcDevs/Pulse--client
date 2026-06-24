import { DashboardAIInsight } from './cards/AiInsight'
import { DashboardHistoryChart } from './charts/HistoryChart'
import { CommunityActivity } from './community/CommunityActivity'

type DashboardChartSidebarProps = {
    showAIInsight: boolean
}

export const DashboardChartSidebar = ({
    showAIInsight
}: DashboardChartSidebarProps) => (
    <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
        <div className={'lg:col-span-2 space-y-6'}>
            <DashboardHistoryChart/>
        </div>
        <div className={'space-y-6'}>
            {showAIInsight && (
                <DashboardAIInsight/>
            )}
            <CommunityActivity fullHeight={!showAIInsight}/>
        </div>
    </div>
)