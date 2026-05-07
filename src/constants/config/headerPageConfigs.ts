import { FEATURES } from '@/config/features'

import { chatLocales } from '@/locales/chatLocales'
import { checkInLocales } from '@/locales/checkInLocales'
import { communityLocales } from '@/locales/communityLocales'
import { dashboardLocales } from '@/locales/dashboardLocales'
import { globalLocales } from '@/locales/globalLocales'
import { goalsLocales } from '@/locales/goalsLocales'
import { insightsLocales } from '@/locales/insightsLocales'
import { progressLocales } from '@/locales/progressLocales'
import { settingsLocales } from '@/locales/settingsLocales'

export type ActionConfig = {
    type: 'newPost' | 'export' | 'share'
    label: string
    variant?: 'default' | 'outline'
    // todo: replace plain text icon with proper LucideIcon
    icon?: 'plus' | 'download' | 'share2'
}

type BadgeConfig = {
    label: string
    variant?: 'default' | 'secondary' | 'live'
    icon?: 'shield' | 'pulse'
}

type HeaderPageConfig = {
    title: string
    subtitle?: string
    showSearch?: boolean
    actions?: ActionConfig[]
    badge?: BadgeConfig
}

export const headerPageConfigs: Record<
    string,
    HeaderPageConfig
> = {
    dashboard: {
        title: dashboardLocales.title
    },
    chat: {
        title: chatLocales.pageTitle,
        subtitle: chatLocales.pageSubtitle,
        badge: {
            label: chatLocales.badge,
            variant: 'secondary',
            icon: 'shield'
        }
    },
    community: {
        title: globalLocales.pageSubtitles.community.title,
        subtitle: globalLocales.pageSubtitles.community.subtitle,
        showSearch: true,
        actions: [
            {
                type: 'newPost',
                label: communityLocales.posts.newPostButton,
                // todo: replace string-based icons with actual icons
                icon: 'plus'
            }
        ]
    },
    insights: {
        title: insightsLocales.title,
        subtitle: insightsLocales.subtitle,
        badge: {
            label: globalLocales.pageSubtitles.insights.badge,
            variant: 'live',
            icon: 'pulse'
        }
    },
    'recovery-goals': {
        title: goalsLocales.header.title
    },
    profile: {
        title: globalLocales.pageSubtitles.profile.title,
        subtitle: globalLocales.pageSubtitles.profile.subtitle
    },
    settings: {
        title: settingsLocales.title,
        subtitle: settingsLocales.subtitle
    },
    'check-in': {
        title: checkInLocales.pageTitle,
        subtitle: checkInLocales.pageSubtitle
    },
    'daily-checkin': {
        title: globalLocales.layout.headerItems.healthOverview
    },
    progress: {
        title: progressLocales.title,
        subtitle: progressLocales.subtitle,
        actions: [
            ...(FEATURES.exportPdf
                ? [
                    {
                        type: 'export' as const,
                        label: progressLocales.exportPdf,
                        variant: 'outline' as const,
                        icon: 'download' as const
                    }
                ]
                : []),
            ...(FEATURES.shareProgress
                ? [
                    {
                        type: 'share' as const,
                        label: progressLocales.shareJourney,
                        variant: 'outline' as const,
                        icon: 'share2' as const
                    }
                ]
                : [])
        ]
    },
    'profile/settings': {
        title: settingsLocales.title
    }
}
