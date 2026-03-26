import {ProgressMilestones} from './Milestones'
import {RecoveryInsight} from './RecoveryInsight'
import {ProgressStatsCharts} from './ProgressStatsCharts'

export const ProgressContent = () => (
    <div className={'p-6 space-y-6'}>
        <ProgressStatsCharts/>
        <ProgressMilestones/>
        <RecoveryInsight/>
    </div>
)
