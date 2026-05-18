import {
    Brain,
    Heart,
    Lock,
    Rocket
} from 'lucide-react'

// todo: replace with real milestones API when backend supports it

export const PROGRESS_MILESTONES_MOCK = [
    {
        title: 'First Step',
        description: 'Complete your first check-in',
        icon: Rocket,
        iconBg: 'bg-primary-light',
        iconColor: 'text-primary',
        achieved: false
    },
    {
        title: '7-Day Streak',
        description: 'Check in 7 days in a row',
        icon: Heart,
        iconBg: 'bg-red-50',
        iconColor: 'text-red-500',
        achieved: false
    },
    {
        title: 'Mind Master',
        description: 'Complete 30 mood check-ins',
        icon: Brain,
        iconBg: 'bg-purple-light',
        iconColor: 'text-purple',
        achieved: false
    },
    {
        title: '1 Month Active',
        description: 'Stay active for a full month',
        icon: Lock,
        iconBg: 'bg-gray-100',
        iconColor: 'text-gray-400',
        achieved: false
    }
]
