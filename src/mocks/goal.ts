import { Goal } from '@/types/goals'

export const MOCK_GOALS: Goal[] = [
    {
        id: '1',
        title: 'Restore Circadian Rhythms',
        description: 'Establishing a consistent sleep-wake cycle to support neurological recovery and emotional regulation.',
        status: 'active',
        badge: 'Active Focus',
        metaText: 'Week 4 of 8',
        week: 4,
        totalWeeks: 8,
        completionPercentage: 33,
        checklist: [
            {
                id: 'cl-1',
                text: 'No screens 60 minutes before bed',
                completed: true
            },
            {
                id: 'cl-2',
                text: 'Morning sunlight exposure (15 mins)',
                completed: false
            },
            {
                id: 'cl-3',
                text: 'Bedtime consistency (± 15 mins)',
                completed: false
            }
        ]
    },
    {
        id: '2',
        title: 'Daily Hydration Anchor',
        description: 'Building the foundation of health by meeting consistent hydration markers throughout the day.',
        status: 'completed',
        badge: 'Achieved',
        metaText: 'Completed June 12',
        completedDate: 'June 12',
        achievements: [
            '21 Day Streak',
            '2.5L Target Met'
        ]
    },
    {
        id: '3',
        title: 'Cognitive Reframing Habit',
        description: 'Scheduled to begin next month',
        status: 'draft',
        badge: 'Draft',
        metaText: 'Scheduled to begin next month'
    }
]