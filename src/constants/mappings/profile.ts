import {
    Activity,
    Bell,
    Brain,
    History,
    type LucideIcon,
    Moon,
    Share2,
    Shield,
    Sparkles,
    Sun
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

export const profileRecoveryIdentityIconMap = {
    'Physical Health': Activity,
    'Mental Wellness': Brain,
    'Sleep & Rest': Moon,
    'Social Connection': Sparkles
}

export const profileRecoveryIdentityColorMap = {
    'Physical Health': 'bg-destructive/10 text-destructive',
    'Mental Wellness': 'bg-secondary/10 text-secondary',
    'Sleep & Rest': 'bg-primary/10 text-primary',
    'Social Connection': 'bg-accent/10 text-accent'
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
