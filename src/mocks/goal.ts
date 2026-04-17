import { RecoveryGoalsData } from '@/types/goals'

export const MOCK_RECOVERY_GOALS_DATA: RecoveryGoalsData = {
    mainGoal: {
        overallPercentage: 65,
        badge: 'ON TRACK',
        title: 'Restore Circadian Rhythms',
        description: 'Establishing a consistent sleep-wake cycle to support neurological recovery and emotional regulation.'
    },
    statSummary: {
        title: 'Recovery Summary',
        description: 'Progress breakdown by category',
        categories: [
            {
                label: 'Sleep Quality',
                percentage: 75
            },
            {
                label: 'Energy Levels',
                percentage: 60
            },
            {
                label: 'Consistency',
                percentage: 58
            }
        ]
    },
    milestones: [
        {
            id: 'm-1',
            title: 'No screens 60 min before bed',
            description: 'Reduce blue light exposure for better sleep onset',
            progressPercentage: 85,
            progressColor: 'bg-emerald-500'
        },
        {
            id: 'm-2',
            title: 'Morning sunlight exposure',
            description: 'Get 15 minutes of natural light each morning',
            progressPercentage: 60,
            progressColor: 'bg-amber-500'
        },
        {
            id: 'm-3',
            title: 'Consistent bedtime',
            description: 'Sleep and wake within ±15 minutes daily',
            progressPercentage: 50,
            progressColor: 'bg-blue-500'
        }
    ]
}
