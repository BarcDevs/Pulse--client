import { DashboardInsightPrompt } from './cards/AiInsightPrompt'
import { DashboardHistoryChart } from './charts/HistoryChart'
import { CommunityActivity } from './community/CommunityActivity'

type DashboardChartSidebarProps = {
    showInsightPrompt: boolean
}

export const DashboardChartSidebar = ({
    showInsightPrompt
}: DashboardChartSidebarProps) => (
    <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
        <div className={'lg:col-span-2 space-y-6'}>
            <DashboardHistoryChart/>
        </div>
        <div className={'space-y-6'}>
            {showInsightPrompt && (
                <DashboardInsightPrompt/>
            )}
            <CommunityActivity fullHeight={!showInsightPrompt}/>
        </div>
    </div>
)