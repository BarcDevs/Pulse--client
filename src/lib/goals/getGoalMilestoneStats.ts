import {
    Goal,
    GoalMilestone,
    MilestoneStatus
} from '@/types/goals'

export type MilestoneStats = {
    milestones: GoalMilestone[]
    total: number
    pct: number
    completedCount: number
    activeMilestone: GoalMilestone | undefined
}

export const getGoalMilestoneStats = (
    goal: Goal
): MilestoneStats => {
    const milestones = goal.milestones ?? []
    const total = goal.milestonesCount ?? milestones.length
    const pct = Math.round((goal.progress ?? 0) * 100)
    const completedCount = milestones.length > 0
        ? milestones.filter(m =>
            m.status === MilestoneStatus.COMPLETED).length
        : Math.round((goal.progress ?? 0) * total)
    const activeMilestone = milestones.find(m =>
        m.status === MilestoneStatus.ACTIVE)

    return {
        milestones,
        total,
        pct,
        completedCount,
        activeMilestone
    }
}