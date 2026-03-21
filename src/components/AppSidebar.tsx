'use client'

import Link from 'next/link'

import {
    CalendarCheck,
    LayoutDashboard,
    Lightbulb,
    MessageCircle,
    Settings,
    TrendingUp,
    User,
    Users,
} from 'lucide-react'

import {Logo} from '@/components/shared/Logo'
import {SidebarNavMenu} from '@/components/shared/SidebarNavMenu'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarSeparator
} from '@/components/ui/sidebar'

import {
    SIDEBAR_AVATAR_ALT,
    SIDEBAR_BOTTOM_NAV,
    SIDEBAR_MAIN_NAV,
    SIDEBAR_USER_NAME,
    SIDEBAR_USER_STATUS,
} from '@/constants/sidebarTexts'

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from './ui/avatar'

const iconMap = {
    dashboard: LayoutDashboard,
    dailyCheckIn: CalendarCheck,
    progress: TrendingUp,
    insights: Lightbulb,
    community: Users,
    aiChat: MessageCircle,
    profile: User,
    settings: Settings,
}

const mainNavItems = SIDEBAR_MAIN_NAV.map(
    (item) => ({
        ...item,
        icon: iconMap[item.id as keyof typeof iconMap],
    }),
)

const bottomNavItems = SIDEBAR_BOTTOM_NAV.map(
    (item) => ({
        ...item,
        icon: iconMap[item.id as keyof typeof iconMap],
    }),
)

const AppSidebar = () => (
    <Sidebar
        collapsible={'icon'}
        className={'border-r-0'}
    >
        <SidebarHeader className={'p-4'}>
            <Logo />
        </SidebarHeader>

        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarNavMenu items={mainNavItems} />
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
            <SidebarSeparator />
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarNavMenu items={bottomNavItems} />
                </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            <div className={'p-2'}>
                <Link
                    href={'/profile'}
                    className={
                        'flex items-center ' +
                        'gap-3 rounded-lg p-2 ' +
                        'transition-colors ' +
                        'hover:bg-sidebar-accent'
                    }
                >
                    <Avatar className={'size-9'}>
                        <AvatarImage
                            src={'/avatars/alex.jpg'}
                            alt={SIDEBAR_AVATAR_ALT}
                        />
                        <AvatarFallback
                            className={
                                'bg-primary-light ' +
                                'text-primary'
                            }
                        >
                            AR
                        </AvatarFallback>
                    </Avatar>
                    <div
                        className={
                            'flex flex-col ' +
                            'group-data-[collapsible=icon]:hidden'
                        }
                    >
                        <span
                            className={
                                'text-sm font-medium ' +
                                'text-foreground'
                            }
                        >
                            {SIDEBAR_USER_NAME}
                        </span>
                        <span
                            className={
                                'text-xs ' +
                                'text-muted-foreground'
                            }
                        >
                            {SIDEBAR_USER_STATUS}
                        </span>
                    </div>
                </Link>
            </div>
        </SidebarFooter>
    </Sidebar>
)

export {AppSidebar}
