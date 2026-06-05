import {
    Activity,
    Bell,
    Brain,
    Check,
    ClipboardCheck,
    Dumbbell,
    Flame,
    Heart,
    History,
    Leaf,
    type LucideIcon,
    Moon,
    Share2,
    Shield,
    Smile,
    Sparkles,
    Sun,
    Target,
    Users
} from 'lucide-react'

import {
    PROFILE_ACTIVITIES,
    PROFILE_SETTINGS,
    RECOVERY_FOCUS_AREAS,
    SYSTEM_PRIVACY_SETTINGS
} from '@/mocks/profileMappings'

type ActivityWithIcon = {
    title: string
    time: string
    tags: string[]
    icon: LucideIcon
}

type RecoveryArea = {
    label: string
    icon: LucideIcon
    color: string
}

type SettingWithIcon = {
    title: string
    description: string
    icon: LucideIcon
}

type PrivacySetting = {
    title: string
    subtitle: string
    icon: LucideIcon
}

export const profileActivitiesIconMap = {
    'Morning Routine': Sun,
    'Evening Reflection': Moon
}

export const profileRecoveryIdentityIconMap: Record<string, LucideIcon> = {
    Recovery: Activity,
    Wellness: Heart,
    'Condition-Specific': Brain,
    Physical: Activity,
    Mindfulness: Moon
}

export const profileRecoveryIdentityColorMap: Record<string, string> = {
    Recovery: 'bg-destructive/10 text-destructive',
    Wellness: 'bg-secondary/10 text-secondary',
    'Condition-Specific': 'bg-primary/10 text-primary',
    Physical: 'bg-secondary/10 text-secondary',
    Mindfulness: 'bg-accent/10 text-accent'
}

export const healthInterestIconMap: Record<string, LucideIcon> = {
    'rehabilitation': Activity,
    'physical-therapy': Dumbbell,
    'occupational-therapy': ClipboardCheck,
    'mobility': Activity,
    'injury-recovery': Heart,
    'surgery-recovery': ClipboardCheck,
    'chronic-pain': Activity,
    'pain-management': Activity,
    'neurological-recovery': Brain,
    'strength-building': Dumbbell,
    'nutrition': Leaf,
    'sleep': Moon,
    'healthy-habits': Check,
    'fitness': Dumbbell,
    'self-care': Heart,
    'mental-health': Brain,
    'emotional-wellbeing': Smile,
    'stress-management': Activity,
    'mindfulness': Sparkles,
    'meditation': Leaf,
    'motivation': Flame,
    'peer-support': Users,
    'disability-support': Heart,
    'goal-progress': Target
}

type RecoveryCategoryStyle = {
    dot: string
    selected: string
}

export const recoveryCategoryStyleMap: Record<string, RecoveryCategoryStyle> = {
    'physical-recovery': {
        dot: 'bg-destructive',
        selected: 'border-destructive bg-destructive/10 text-destructive'
    },
    'wellness': {
        dot: 'bg-secondary',
        selected: 'border-secondary bg-secondary/10 text-secondary'
    },
    'mental-emotional': {
        dot: 'bg-violet-500',
        selected: 'border-violet-500 bg-violet-100 text-violet-700'
    },
    'community-support': {
        dot: 'bg-primary',
        selected: 'border-primary bg-primary/10 text-primary'
    }
}

export const profileSettingsIconMap = {
    'Security': Shield,
    'Notifications': Bell,
    'Data Sharing': Share2,
    'Login History': History
}

export const profileSystemPrivacyIconMap = {
    Security: Shield,
    Notifications: Bell,
    'Data Sharing': Share2,
    'Login History': History
}

export const profileActivitiesWithIcons: ActivityWithIcon[] =
    PROFILE_ACTIVITIES.map((activity) => ({
        ...activity,
        icon:
            profileActivitiesIconMap[
                activity.title as
                    keyof typeof profileActivitiesIconMap
                ]
    }))

export const recoveryFocusAreasWithIcons: RecoveryArea[] =
    RECOVERY_FOCUS_AREAS.map((area) => ({
        ...area,
        icon:
            profileRecoveryIdentityIconMap[
                area.label as
                    keyof typeof profileRecoveryIdentityIconMap
                ],
        color:
            profileRecoveryIdentityColorMap[
                area.label as
                    keyof typeof profileRecoveryIdentityColorMap
                ]
    }))

export const profileSettingsWithIcons: SettingWithIcon[] =
    PROFILE_SETTINGS.map((setting) => ({
        ...setting,
        icon:
            profileSettingsIconMap[
                setting.title as
                    keyof typeof profileSettingsIconMap
                ]
    }))

export const profileSystemPrivacySettingsWithIcons: PrivacySetting[] =
    SYSTEM_PRIVACY_SETTINGS.map((setting) => ({
        title: setting.title,
        subtitle: setting.description,
        icon:
            profileSystemPrivacyIconMap[
                setting.title as
                    keyof typeof profileSystemPrivacyIconMap
                ]
    }))
