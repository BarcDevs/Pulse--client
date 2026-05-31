export enum GoalCategory {
    PHYSICAL = 'PHYSICAL',
    MENTAL = 'MENTAL',
    LIFESTYLE = 'LIFESTYLE'
}

export enum GoalStatus {
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    PAUSED = 'PAUSED',
    ABANDONED = 'ABANDONED'
}

export enum MilestoneStatus {
    LOCKED = 'LOCKED',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED'
}

export type Goal = {
    id: string
    profileId: string
    title: string
    description: string | null
    category: GoalCategory
    status: GoalStatus
    targetDate?: string | null
    isPrimary: boolean
    milestones?: GoalMilestone[]
    milestonesCount?: number
    nextMilestone?: string
    progress?: number
    createdAt: string
    updatedAt: string
}

export type GoalMilestone = {
    id: string
    goalId: string
    title: string
    description?: string
    status: MilestoneStatus
    order: number
    completedAt?: string
    createdAt: string
    updatedAt: string
}

export type GoalInput = {
    title: string
    description?: string
    category: GoalCategory
    targetDate?: string
}

export type MilestoneInput = {
    title: string
    description?: string
}

export type MilestonePatchInput = {
    title?: string
    status?: MilestoneStatus
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

export type RecoveryGoalsStats = {
    goals: {
        totalCreated: number
        completed: number
        completionRate: number
        streak: number
        active: number
        paused: number
        byCategory: {
            PHYSICAL: number
            MENTAL: number
            LIFESTYLE: number
        }
    }
    milestones: {
        totalCreated: number
        completed: number
        completionRate: number
        streak: number
        active: number
        paused: number
    }
}

export type GoalStatusToken = {
    cardBg: string
    cardBorder: string
    stripeGradient: string
    ribbonCn: string
    dotCn: string
    countBadgeCn: string
    footerBg: string
    accentText: string
    progressFill: string
    progressTrack: string
}

export type MilestoneCardConfig = {
    bgClass: string
    borderClass: string
    opacityClass: string
    padding: string
    statusLabelKey: string
    statusLabelOrder: number
    statusBadgeClass: string
    titleSize: string
    contentLayout: string
}

export type GoalsLocales = {
    milestoneCardLabels: {
        completedFormat: string
        activeFormat: string
        lockedFormat: string
    }
}