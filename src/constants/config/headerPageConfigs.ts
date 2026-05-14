import {
    Download,
    type LucideIcon,
    Plus,
    Share2,
    Shield
} from 'lucide-react'

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
    icon?: LucideIcon
}

type BadgeConfig = {
    label: string
    variant?: 'default' | 'secondary' | 'live'
    icon?: LucideIcon
    pulse?: boolean
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
            icon: Shield
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
                icon: Plus
            }
        ]
    },
    insights: {
        title: insightsLocales.title,
        subtitle: insightsLocales.subtitle,
        badge: {
            label: globalLocales.pageSubtitles.insights.badge,
            variant: 'live',
            pulse: true
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
                        icon: Download
                    }
                ]
                : []),
            ...(FEATURES.shareProgress
                ? [
                    {
                        type: 'share' as const,
                        label: progressLocales.shareJourney,
                        variant: 'outline' as const,
                        icon: Share2
                    }
                ]
                : [])
        ]
    },
    'profile/settings': {
        title: settingsLocales.title
    }
}