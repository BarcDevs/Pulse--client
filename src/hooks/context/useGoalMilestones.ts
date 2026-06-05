import { useContext } from 'react'

import { GoalMilestonesContext } from '@/context/GoalMilestonesContext'

export const useGoalMilestones = () => {
    const context = useContext(GoalMilestonesContext)
    if (!context) {
        throw new Error(
            'useGoalMilestones must be used within GoalMilestonesProvider'
        )
    }
    return context
}
