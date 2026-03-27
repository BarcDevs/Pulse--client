import {ProgressMilestones} from './Milestones'
import {ProgressStatsCharts} from './ProgressStatsCharts'
import {RecoveryInsight} from './RecoveryInsight'

export const ProgressContent = () => (
    <div className={'p-6 space-y-6'}>
        <ProgressStatsCharts/>
        <ProgressMilestones/>
        <RecoveryInsight/>
    </div>
)
