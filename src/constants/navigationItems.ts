import {
    BarChart3,
    CalendarCheck,
    Home,
    Lightbulb,
    LogOut,
    MessageCircle,
    Settings,
    Trophy,
    User,
    Users
} from 'lucide-react'

import { ROUTES } from '@/constants/routes'

import { globalLocales } from '@/locales/globalLocales'

export type NavItem = {
    icon: typeof Home
    labelKey: string
    href: string
}

export const mainNavItems: NavItem[] = [
    {
        icon: Home,
        labelKey: globalLocales.nav.sidebar.dashboard,
        href: ROUTES.DASHBOARD
    },
    {
        icon: CalendarCheck,
        labelKey: globalLocales.nav.sidebar.dailyCheckIn,
        href: ROUTES.DAILY_CHECKIN
    },
    {
        icon: BarChart3,
        labelKey: globalLocales.nav.sidebar.progress,
        href: ROUTES.PROGRESS
    },
    {
        icon: Trophy,
        labelKey: globalLocales.nav.sidebar.recoveryGoals,
        href: ROUTES.RECOVERY_GOALS
    },
    {
        icon: Lightbulb,
        labelKey: globalLocales.nav.sidebar.insights,
        href: ROUTES.INSIGHTS
    },
    {
        icon: Users,
        labelKey: globalLocales.nav.sidebar.community,
        href: ROUTES.COMMUNITY
    },
    {
        icon: MessageCircle,
        labelKey: globalLocales.nav.sidebar.chat,
        href: ROUTES.CHAT
    }
]

export const userMenuItems: NavItem[] = [
    {
        icon: User,
        labelKey: globalLocales.nav.sidebar.profile,
        href: ROUTES.PROFILE
    },
    {
        icon: Settings,
        labelKey: globalLocales.nav.sidebar.settings,
        href: ROUTES.PROFILE_SETTINGS
    },
    {
        icon: LogOut,
        labelKey: globalLocales.nav.sidebar.logout,
        href: ROUTES.LOGOUT
    }
]