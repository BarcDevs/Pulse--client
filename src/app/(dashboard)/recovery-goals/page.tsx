'use client'

import { RecoveryGoalsPageContent } from '@/components/goals/RecoveryGoalsPageContent'

import { FEATURES } from '@/config/features'

const RecoveryGoalsPage = () => {
    if (!FEATURES.recoveryGoals) return null
    return <RecoveryGoalsPageContent/>
}

export default RecoveryGoalsPage
