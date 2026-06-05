'use client'

import { GoalInsightsSection } from './GoalInsightsSection'
import { GoalStatsSection } from './GoalStatsSection'

export const GoalInsightsSidebar = () => (
    <div className={'space-y-6'}>
        <GoalInsightsSection/>
        <GoalStatsSection/>
    </div>
)
