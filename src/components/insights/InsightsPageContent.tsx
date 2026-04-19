import { FEATURES } from '@/config/features'

import { AlertCards } from './alerts/AlertCards'
import { BehavioralPatterns } from './behavioralPatterns/BehavioralPatterns'
import { InsightsTopRow } from './sections/InsightsTopRow'
import { InsightsSummary } from './sections/Summary'

// TODO: Implement real data fetching and add error cards when APIs are ready
export const InsightsPageContent = () => (
    FEATURES.insights ? (
        <div className={'p-6 space-y-6'}>
            <InsightsTopRow/>
            <AlertCards/>
            {FEATURES.advancedInsights && (
                <>
                    <BehavioralPatterns/>
                    <InsightsSummary/>
                </>
            )}
        </div>
    ) : null
)
