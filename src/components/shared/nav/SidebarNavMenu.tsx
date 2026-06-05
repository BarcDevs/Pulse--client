import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { LucideIcon } from 'lucide-react'

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar'

type NavItem = {
    id: string
    labelKey: string
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
    const t = useTranslations()

    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.labelKey}>
                    <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={t(item.labelKey)}
                    >
                        <Link href={item.href}>
                            <item.icon className={'size-5'}/>
                            <span>
                                {t(item.labelKey)}
                            </span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}
