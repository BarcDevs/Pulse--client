'use client'

import { RecoveryGoalsPageContent } from '@/components/goals/RecoveryGoalsPageContent'

import { FEATURES } from '@/config/features'

import { MOCK_RECOVERY_GOALS_DATA } from '@/mocks/goal'

const RecoveryGoalsPage = () => {
    if (!FEATURES.recoveryGoals)
        return null

    return (
        <RecoveryGoalsPageContent
            data={MOCK_RECOVERY_GOALS_DATA}
        />
    )
}

export default RecoveryGoalsPage
