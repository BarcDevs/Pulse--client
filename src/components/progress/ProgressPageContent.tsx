import { FEATURES } from '@/config/features'

import { ProgressStatsCharts } from './stats/ProgressStatsCharts'
import { ProgressMilestones } from './Milestones'
import { RecoveryInsight } from './RecoveryInsight'

export const ProgressPageContent = () => (
    FEATURES.progressInsights ? (
        <div className={'p-6 space-y-6'}>
            <ProgressStatsCharts/>
            <ProgressMilestones/>
            {FEATURES.motivationFeedback && (
                <RecoveryInsight/>
            )}
        </div>
    ) : null
)
