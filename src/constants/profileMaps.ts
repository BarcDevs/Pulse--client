import {
    Activity,
    Bell,
    Brain,
    History,
    Moon,
    Share2,
    Shield,
    Sparkles,
    Sun
} from 'lucide-react'

import {
    PROFILE_ACTIVITIES_LIST,
    PROFILE_RECOVERY_IDENTITY_FOCUS_AREAS,
    PROFILE_SETTINGS_LIST
} from '@/constants/profileTexts'
import {
    PROFILE_SYSTEM_PRIVACY_SETTINGS
} from '@/constants/profileDetailTexts'

export const PROFILE_ACTIVITIES_ICON_MAP = {
    'Morning Routine': Sun,
    'Evening Reflection': Moon,
}

export const PROFILE_RECOVERY_IDENTITY_ICON_MAP = {
    'Pain Management': Activity,
    'Mental Clarity': Brain,
    'Mindfulness': Sparkles,
}

export const PROFILE_RECOVERY_IDENTITY_COLOR_MAP = {
    'Pain Management': 'bg-destructive/10 text-destructive',
    'Mental Clarity': 'bg-secondary/10 text-secondary',
    'Mindfulness': 'bg-accent/10 text-accent',
}

export const PROFILE_SETTINGS_ICON_MAP = {
    'Security': Shield,
    'Notifications': Bell,
    'Data Sharing': Share2,
    'Login History': History,
}

export const PROFILE_SYSTEM_PRIVACY_ICON_MAP = {
    Security: Shield,
    Notifications: Bell,
    'Data Sharing': Share2,
    'Login History': History,
}

export const PROFILE_ACTIVITIES_WITH_ICONS =
    PROFILE_ACTIVITIES_LIST.map((activity) => ({
        ...activity,
        icon:
            PROFILE_ACTIVITIES_ICON_MAP[
                activity.title as
                    keyof typeof PROFILE_ACTIVITIES_ICON_MAP
            ]
    }))

export const PROFILE_RECOVERY_IDENTITY_FOCUS_AREAS_WITH_ICONS =
    PROFILE_RECOVERY_IDENTITY_FOCUS_AREAS.map((area) => ({
        ...area,
        icon:
            PROFILE_RECOVERY_IDENTITY_ICON_MAP[
                area.label as
                    keyof typeof PROFILE_RECOVERY_IDENTITY_ICON_MAP
            ],
        color:
            PROFILE_RECOVERY_IDENTITY_COLOR_MAP[
                area.label as
                    keyof typeof PROFILE_RECOVERY_IDENTITY_COLOR_MAP
            ],
    }))

export const PROFILE_SETTINGS_WITH_ICONS =
    PROFILE_SETTINGS_LIST.map((setting) => ({
        ...setting,
        icon:
            PROFILE_SETTINGS_ICON_MAP[
                setting.title as
                    keyof typeof PROFILE_SETTINGS_ICON_MAP
            ]
    }))

export const PROFILE_SYSTEM_PRIVACY_SETTINGS_WITH_ICONS =
    PROFILE_SYSTEM_PRIVACY_SETTINGS.map((setting) => ({
        ...setting,
        icon:
            PROFILE_SYSTEM_PRIVACY_ICON_MAP[
                setting.title as
                    keyof typeof PROFILE_SYSTEM_PRIVACY_ICON_MAP
            ]
    }))
