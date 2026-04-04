import { ProgressStatsCharts } from './stats/ProgressStatsCharts'
import { ProgressMilestones } from './Milestones'
import { RecoveryInsight } from './RecoveryInsight'

export const ProgressPageContent = () => (
    <div className={'p-6 space-y-6'}>
        <ProgressStatsCharts/>
        <ProgressMilestones/>
        <RecoveryInsight/>
    </div>
)
