'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

type PageHeaderTabsProps = {
    tabs: { label: string; href: string }[]
}

export const PageHeaderTabs = ({
    tabs
}: PageHeaderTabsProps) => {
    const pathname = usePathname()

    return (
        <div className={'flex flex-wrap gap-2'}>
            {tabs.map((tab) => (
                <Link
                    key={tab.href}
                    href={tab.href}
                    className={cn(
                        'rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
                        pathname === tab.href
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:text-on-surface'
                    )}
                >
                    {tab.label}
                </Link>
            ))}
        </div>
    )
}
