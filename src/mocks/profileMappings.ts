import {
    Activity,
    Brain,
    type LucideIcon,
    Moon,
    Sun
} from 'lucide-react'

export const PROFILE_ACTIVITIES = [
    {
        title: 'Morning Routine',
        time: 'Scheduled for 07:30 AM',
        tags: ['MEDITATION', 'STRETCH']
    },
    {
        title: 'Evening Reflection',
        time: 'Scheduled for 09:00 PM',
        tags: ['JOURNALING', 'GRATITUDE']
    }
]

type RecoveryFocusArea = {
    label: string
    icon: LucideIcon
    color: string
}

export const RECOVERY_FOCUS_AREAS: RecoveryFocusArea[] = [
    {
        label: 'Physical Health',
        icon: Activity,
        color: 'text-green-600'
    },
    {
        label: 'Mental Wellness',
        icon: Brain,
        color: 'text-purple-600'
    },
    {
        label: 'Sleep & Rest',
        icon: Moon,
        color: 'text-blue-600'
    },
    {
        label: 'Social Connection',
        icon: Sun,
        color: 'text-yellow-600'
    }
]

export const PROFILE_SETTINGS = [
    {
        title: 'Security',
        description: 'Last updated 10 days'
    },
    {
        title: 'Notifications',
        description: 'Push enabled'
    },
    {
        title: 'Data Sharing',
        description: 'Clinician view On'
    },
    {
        title: 'Login History',
        description: 'San Francisco, CA'
    }
]

export const SYSTEM_PRIVACY_SETTINGS = [
    {
        title: 'Security',
        description: 'Last updated 10 days'
    },
    {
        title: 'Notifications',
        description: 'Push enabled'
    },
    {
        title: 'Data Sharing',
        description: 'Clinician view On'
    },
    {
        title: 'Login History',
        description: 'San Francisco, CA'
    }
]