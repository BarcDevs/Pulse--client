import {
    BarChart3,
    Home,
    LogOut,
    MessageCircle,
    Settings,
    Users,
} from 'lucide-react'

export type SidebarSectionType = 'nav' | 'chat' | 'community'

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
        icon: MessageCircle,
        label: 'Chat',
        href: '/chat',
        isActive: (pathname) => pathname
            .startsWith('/chat'),
    },
    {
        icon: Users,
        label: 'Community',
        href: '/community',
        isActive: (pathname) => pathname
            .startsWith('/community'),
    },
    {
        icon: BarChart3,
        label: 'Progress',
        href: '/progress',
        isActive: (pathname) => pathname === '/progress',
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

const routeSections: Record<string, SidebarSectionType[]> = {
    '/dashboard': ['nav'],
    '/chat': ['nav', 'chat'],
    '/community': ['nav', 'community'],
    '/progress': ['nav'],
    '/profile': ['nav'],
    '/daily-checkin': ['nav'],
}

export const useSidebarSections = (
    pathname: string,
): SidebarSectionType[] => {
    for (const [route, sections] of Object.entries(
        routeSections,
    )) {
        if (pathname.startsWith(route)) {
            return sections
        }
    }
    return ['nav']
}