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
    isActive?: (pathname: string) => boolean
}

export const MAIN_NAV_ITEMS: NavItem[] = [
    {
        icon: Home,
        label: 'Dashboard',
        href: '/dashboard',
        isActive: (pathname) => pathname === '/dashboard',
    },
    {
        icon: CalendarCheck,
        label: 'Daily Check-In',
        href: '/daily-checkin',
        isActive: (pathname) => pathname === '/daily-checkin',
    },
    {
        icon: BarChart3,
        label: 'Progress',
        href: '/progress',
        isActive: (pathname) => pathname === '/progress',
    },
    {
        icon: Lightbulb,
        label: 'Insights',
        href: '/insights',
        isActive: (pathname) => pathname === '/insights',
    },
    {
        icon: Users,
        label: 'Community',
        href: '/community',
        isActive: (pathname) => pathname
            .startsWith('/community'),
    },
    {
        icon: MessageCircle,
        label: 'Chat',
        href: '/chat',
        isActive: (pathname) => pathname
            .startsWith('/chat'),
    },
]

export const BOTTOM_NAV_ITEMS: NavItem[] = [
    {
        icon: Settings,
        label: 'Settings',
        href: '/profile/settings',
        isActive: (pathname) => pathname
            .startsWith('/profile'),
    },
    {
        icon: LogOut,
        label: 'Logout',
        href: '/logout',
        isActive: () => false,
    },
]