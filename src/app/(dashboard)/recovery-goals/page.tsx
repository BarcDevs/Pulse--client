import { RecoveryGoalsPageContent } from '@/components/goals/RecoveryGoalsPageContent'

import { FEATURES } from '@/config/features'

import { MOCK_GOALS } from '@/mocks/goal'

const RecoveryGoalsPage = () => {
    if (!FEATURES.recoveryGoals)
        return null

    return <RecoveryGoalsPageContent
        initialGoals={MOCK_GOALS}
    />
}

export default RecoveryGoalsPage