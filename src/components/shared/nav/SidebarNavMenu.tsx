import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LucideIcon } from 'lucide-react'

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar'

type NavItem = {
    id: string
    label: string
    href: string
    icon: LucideIcon
}

type SidebarNavMenuProps = {
    items: NavItem[]
}

export const SidebarNavMenu = ({
    items
}: SidebarNavMenuProps) => {
    const pathname = usePathname()

    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={item.label}
                    >
                        <Link href={item.href}>
                            <item.icon className={'size-5'} />
                            <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}
