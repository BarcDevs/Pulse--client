'use client'

import { RecoveryGoalsPageContent } from '@/components/goals/RecoveryGoalsPageContent'

import { GoalsProvider } from '@/context/GoalsContext'

const RecoveryGoalsPage = () => (
    <GoalsProvider>
        <RecoveryGoalsPageContent/>
    </GoalsProvider>
)

export default RecoveryGoalsPage
