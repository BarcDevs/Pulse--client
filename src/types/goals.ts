export type CategoryStat = {
    label: string
    percentage: number
}

export type Milestone = {
    id: string
    title: string
    description: string
    progressPercentage: number
    progressColor: string
}

export type MainGoalCard = {
    overallPercentage: number
    badge: string
    title: string
    description: string
}

export type StatSummaryCard = {
    title: string
    description: string
    categories: CategoryStat[]
}

export type RecoveryGoalsData = {
    mainGoal: MainGoalCard
    statSummary: StatSummaryCard
    milestones: Milestone[]
}
