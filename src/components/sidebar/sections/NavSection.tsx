'use client'

import {usePathname, useRouter} from 'next/navigation'

import {MAIN_NAV_ITEMS} from '@/components/sidebar/config'

import {cn} from '@/lib/utils'

export const NavSection = () => {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <div className={'space-y-1 px-4'}>
            {MAIN_NAV_ITEMS.map((item) => {
                const isActive = item.isActive?.(pathname || '')
                const Icon = item.icon
                return (
                    <button
                        key={item.href}
                        onClick={() => router.push(item.href)}
                        className={cn(
                            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-surface-section hover:text-foreground',
                            isActive
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground'
                        )}
                    >
                        <Icon className={'size-5'}/>
                        <span>
                            {item.label}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}