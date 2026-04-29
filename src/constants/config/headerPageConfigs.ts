import { chatTexts } from '@/constants/componentTexts/chat'
import { checkInTexts } from '@/constants/componentTexts/checkIn'
import { communityPageTexts } from '@/constants/componentTexts/community'
import { dashboardPageTexts } from '@/constants/componentTexts/dashboard'
import { progressPageTexts } from '@/constants/componentTexts/progress'
import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'
import { settingsPageTexts } from '@/constants/componentTexts/settings'
import { appLayoutTexts } from '@/constants/componentTexts/ui/layout'
import { PAGES } from '@/constants/componentTexts/ui/pageSubtitles'

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
        title: dashboardPageTexts.title
    },
    chat: {
        title: chatTexts.pageTitle,
        subtitle: chatTexts.pageSubtitle,
        badge: {
            label: chatTexts.badge,
            variant: 'secondary',
            icon: 'shield'
        }
    },
    community: {
        title: PAGES.community.TITLE,
        subtitle: PAGES.community.SUBTITLE,
        showSearch: true,
        actions: [
            {
                type: 'newPost',
                label: communityPageTexts.posts.newPostButton,
                icon: 'plus'
            }
        ]
    },
    insights: {
        title: PAGES.INSIGHTS.TITLE,
        subtitle: PAGES.INSIGHTS.SUBTITLE,
        badge: {
            label: PAGES.INSIGHTS.BADGE,
            variant: 'live',
            icon: 'pulse'
        }
    },
    'recovery-goals': {
        title: recoveryGoalsPageTexts.header.title
    },
    profile: {
        title: PAGES.profile.TITLE,
        subtitle: PAGES.profile.SUBTITLE
    },
    settings: {
        title: settingsPageTexts.title,
        subtitle: settingsPageTexts.subtitle
    },
    'check-in': {
        title: checkInTexts.pageTitle,
        subtitle: checkInTexts.pageSubtitle
    },
    'daily-checkin': {
        title: appLayoutTexts.headerItems.healthOverview
    },
    progress: {
        title: progressPageTexts.title,
        subtitle: progressPageTexts.subtitle,
        actions: [
            {
                type: 'export',
                label: progressPageTexts.exportPdf,
                variant: 'outline',
                icon: 'download'
            },
            {
                type: 'share',
                label: progressPageTexts.shareJourney,
                variant: 'outline',
                icon: 'share2'
            }
        ]
    },
    'profile/settings': {
        title: settingsPageTexts.title
    }
}
