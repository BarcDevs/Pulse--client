'use client'

import {Logo} from '@/components/shared/Logo'
import {
    CalendarCheck,
    LayoutDashboard,
    Lightbulb,
    MessageCircle,
    Settings,
    TrendingUp,
    User,
    Users
} from 'lucide-react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/Avatar'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator
} from '@/components/ui/Sidebar'

const mainNavItems = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { title: 'Daily Check-In', href: '/check-in', icon: CalendarCheck },
    { title: 'Progress', href: '/progress', icon: TrendingUp },
    { title: 'Insights', href: '/insights', icon: Lightbulb },
    { title: 'Community', href: '/community', icon: Users },
    { title: 'AI Chat', href: '/chat', icon: MessageCircle }
]

const bottomNavItems = [
    { title: 'Profile', href: '/profile', icon: User },
    { title: 'Settings', href: '/settings', icon: Settings }
]

export function AppSidebar () {
    const pathname = usePathname()

    return (
        <Sidebar collapsible="icon" className="border-r-0">
            <SidebarHeader className="p-4">
                <Logo/>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.href}
                                        tooltip={item.title}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-5"/>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarSeparator/>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {bottomNavItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.href}
                                        tooltip={item.title}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-5"/>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator/>

                <div className="p-2">
                    <Link
                        href="/profile"
                        className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[var(--sidebar-accent)]"
                    >
                        <Avatar className="size-9">
                            <AvatarImage src="/avatars/alex.jpg" alt="Alex Rivera"/>
                            <AvatarFallback className="bg-[var(--primary-light)] text-[var(--primary)]">
                                AR
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                            <span className="text-sm font-medium text-[var(--foreground)]">Alex Rivera</span>
                            <span className="text-xs text-[var(--muted-foreground)]">Day 142 in Recovery</span>
                        </div>
                    </Link>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
