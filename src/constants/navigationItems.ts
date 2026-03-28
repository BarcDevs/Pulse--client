import {
    BarChart3,
    CalendarCheck,
    Home,
    Lightbulb,
    LogOut,
    MessageCircle,
    Settings,
    Users,
} from 'lucide-react'

export type NavItem = {
    icon: typeof Home
    label: string
    href: string
}

export const MAIN_NAV_ITEMS: NavItem[] = [
    {
        icon: Home,
        label: 'Dashboard',
        href: '/dashboard',
    },
    {
        icon: CalendarCheck,
        label: 'Daily Check-In',
        href: '/daily-checkin',
    },
    {
        icon: BarChart3,
        label: 'Progress',
        href: '/progress',
    },
    {
        icon: Lightbulb,
        label: 'Insights',
        href: '/insights',
    },
    {
        icon: Users,
        label: 'Community',
        href: '/community',
    },
    {
        icon: MessageCircle,
        label: 'Chat',
        href: '/chat',
    },
]

export const BOTTOM_NAV_ITEMS: NavItem[] = [
    {
        icon: Settings,
        label: 'Settings',
        href: '/profile/settings',
    },
    {
        icon: LogOut,
        label: 'Logout',
        href: '/logout',
    },
]
