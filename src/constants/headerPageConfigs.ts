import * as ChatTexts from '@/constants/chatTexts'
import * as CheckInTexts from '@/constants/checkInTexts'
import * as CommunityTexts from '@/constants/communityTexts'
import * as DashboardTexts from '@/constants/dashboardTexts'
import {HEADER_HEALTH_OVERVIEW} from '@/constants/layoutTexts'
import * as PageSubtitles from '@/constants/pageSubtitlesTexts'
import * as ProgressTexts from '@/constants/progressTexts'
import * as SettingsTexts from '@/constants/settingsTexts'

export type ActionConfig = {
    type: 'newPost' | 'export' | 'share'
    label: string
    variant?: 'default' | 'outline'
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
        title: DashboardTexts.DASHBOARD_TITLE,
        subtitle: DashboardTexts.DASHBOARD_SUBTITLE
    },
    chat: {
        title: ChatTexts.CHAT_PAGE_TITLE,
        subtitle: ChatTexts.CHAT_PAGE_SUBTITLE,
        badge: {
            label: ChatTexts.CHAT_BADGE,
            variant: 'secondary',
            icon: 'shield'
        }
    },
    community: {
        title: PageSubtitles.COMMUNITY_PAGE_TITLE,
        subtitle: PageSubtitles.COMMUNITY_PAGE_SUBTITLE,
        showSearch: true,
        actions: [
            {
                type: 'newPost',
                label: CommunityTexts.COMMUNITY_NEW_POST_BUTTON,
                icon: 'plus'
            }
        ]
    },
    insights: {
        title: PageSubtitles.INSIGHTS_PAGE_TITLE,
        subtitle: PageSubtitles.INSIGHTS_PAGE_SUBTITLE,
        badge: {
            label: PageSubtitles.INSIGHTS_PAGE_BADGE,
            variant: 'live',
            icon: 'pulse'
        }
    },
    profile: {
        title: PageSubtitles.PROFILE_PAGE_TITLE,
        subtitle: PageSubtitles.PROFILE_PAGE_SUBTITLE
    },
    settings: {
        title: SettingsTexts.SETTINGS_TITLE,
        subtitle: SettingsTexts.SETTINGS_SUBTITLE
    },
    'check-in': {
        title: CheckInTexts.CHECK_IN_PAGE_TITLE,
        subtitle: CheckInTexts.CHECK_IN_PAGE_SUBTITLE
    },
    'daily-checkin': {
        title: HEADER_HEALTH_OVERVIEW
    },
    progress: {
        title: ProgressTexts.PROGRESS_TITLE,
        subtitle: ProgressTexts.PROGRESS_SUBTITLE,
        actions: [
            {
                type: 'export',
                label: ProgressTexts.PROGRESS_EXPORT_PDF,
                variant: 'outline',
                icon: 'download'
            },
            {
                type: 'share',
                label: ProgressTexts.PROGRESS_SHARE_JOURNEY,
                variant: 'outline',
                icon: 'share2'
            }
        ]
    },
    'profile/settings': {
        title: SettingsTexts.SETTINGS_TITLE
    }
}
