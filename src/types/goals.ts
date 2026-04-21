export type Goal = {
    id: string
    userId: string
    title: string
    description: string
    milestones: GoalMilestone[]
    createdAt: string
    updatedAt: string
}

export type GoalMilestone = {
    id: string
    goalId: string
    title: string
    isCompleted: boolean
    order: number
    createdAt: string
    updatedAt: string
}

export type GoalInput = {
    title: string
    description?: string
}

export type MilestoneInput = {
    title: string
}

export type MilestonePatchInput = {
    title?: string
    isCompleted?: boolean
}

export type GoalStat = {
    label: string
    percentage: number
}

export type StatSummaryCardData = {
    title: string
    description: string
    goal: GoalStat[]
}