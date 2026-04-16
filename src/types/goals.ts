export type GoalStatus = 'active' | 'completed' | 'draft'

export type GoalChecklistItem = {
    id: string
    text: string
    completed: boolean
}

export type Goal = {
    id: string
    title: string
    description: string
    status: GoalStatus
    week?: number
    totalWeeks?: number
    completionPercentage?: number
    badge: string
    metaText: string
    checklist?: GoalChecklistItem[]
    completedDate?: string
    achievements?: string[]
}
