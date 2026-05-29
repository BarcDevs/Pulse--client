import {
    GoalStatus,
    GoalStatusToken
} from '@/types/goals'

export const GOAL_STATUS_TOKENS: Record<
    GoalStatus,
    GoalStatusToken
> = {
    [GoalStatus.ACTIVE]: {
        cardBg: 'bg-active-goal-bg hover:bg-active-goal-soft/50',
        cardBorder: 'ring-1 ring-active-goal/30',
        stripeGradient: 'linear-gradient(180deg, #2976c7 0%, #005da7 100%)',
        ribbonCn: 'bg-active-goal text-white',
        dotCn: 'bg-active-goal',
        countBadgeCn: 'bg-active-goal-soft text-active-goal',
        footerBg: 'bg-active-goal-soft/70',
        accentText: 'text-active-goal',
        progressFill: 'bg-active-goal',
        progressTrack: 'bg-active-goal-soft'
    },
    [GoalStatus.PAUSED]: {
        cardBg: 'bg-paused-goal-bg hover:bg-paused-goal-soft/50',
        cardBorder: 'ring-2 ring-paused-goal/30',
        stripeGradient: 'repeating-linear-gradient(180deg, #c97f1a 0px 6px, transparent 6px 12px)',
        ribbonCn: 'bg-paused-goal text-white',
        dotCn: 'bg-paused-goal',
        countBadgeCn: 'bg-paused-goal-soft text-paused-goal',
        footerBg: 'bg-paused-goal-soft/70',
        accentText: 'text-paused-goal',
        progressFill: 'bg-paused-goal',
        progressTrack: 'bg-paused-goal-soft'
    },
    [GoalStatus.COMPLETED]: {
        cardBg: 'bg-completed-goal-bg hover:bg-completed-goal-soft/50',
        cardBorder: 'ring-1 ring-completed-goal/30',
        stripeGradient: 'linear-gradient(180deg, #00a888 0%, #006b5b 100%)',
        ribbonCn: 'bg-completed-goal text-white',
        dotCn: 'bg-completed-goal',
        countBadgeCn: 'bg-completed-goal-soft text-completed-goal',
        footerBg: 'bg-completed-goal-soft/70',
        accentText: 'text-completed-goal',
        progressFill: 'bg-completed-goal',
        progressTrack: 'bg-completed-goal-soft'
    },
    [GoalStatus.ABANDONED]: {
        cardBg: 'bg-abandoned-goal-bg hover:bg-abandoned-goal-soft/50',
        cardBorder: 'ring-1 ring-abandoned-goal/30',
        stripeGradient: 'linear-gradient(180deg, #b4b9c1 0%, #717783 100%)',
        ribbonCn: 'bg-abandoned-goal text-white',
        dotCn: 'bg-abandoned-goal',
        countBadgeCn: 'bg-abandoned-goal-soft text-abandoned-goal',
        footerBg: 'bg-abandoned-goal-soft/70',
        accentText: 'text-abandoned-goal',
        progressFill: 'bg-abandoned-goal',
        progressTrack: 'bg-abandoned-goal-soft'
    }
}

export const GOAL_BADGES = {
    NOT_STARTED: 'NOT STARTED',
    IN_PROGRESS: 'IN PROGRESS',
    ON_TRACK: 'ON TRACK',
    COMPLETE: 'COMPLETE'
} as const

export type GoalBadge =
    typeof GOAL_BADGES[keyof typeof GOAL_BADGES]
