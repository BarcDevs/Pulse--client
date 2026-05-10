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
        href: '/dashboard'
    },
    {
        icon: CalendarCheck,
        labelKey: globalLocales.nav.sidebar.dailyCheckIn,
        href: '/daily-checkin'
    },
    {
        icon: BarChart3,
        labelKey: globalLocales.nav.sidebar.progress,
        href: '/progress'
    },
    {
        icon: Trophy,
        labelKey: globalLocales.nav.sidebar.recoveryGoals,
        href: '/recovery-goals'
    },
    {
        icon: Lightbulb,
        labelKey: globalLocales.nav.sidebar.insights,
        href: '/insights'
    },
    {
        icon: Users,
        labelKey: globalLocales.nav.sidebar.community,
        href: '/community'
    },
    {
        icon: MessageCircle,
        labelKey: globalLocales.nav.sidebar.chat,
        href: '/chat'
    }
]

export const userMenuItems: NavItem[] = [
    {
        icon: User,
        labelKey: globalLocales.nav.sidebar.profile,
        href: '/profile'
    },
    {
        icon: Settings,
        labelKey: globalLocales.nav.sidebar.settings,
        href: '/profile/settings'
    },
    {
        icon: LogOut,
        labelKey: globalLocales.nav.sidebar.logout,
        href: '/logout'
    }
]