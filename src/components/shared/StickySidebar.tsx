import { ReactNode } from 'react'

import { ClassName } from '@/types/react'

import { cn } from '@/lib/utils'

type StickySidebarProps = {
    className?: ClassName
    children: ReactNode
}

export const StickySidebar = ({
    className,
    children
}: StickySidebarProps) => (
    <aside className={cn(
        'sticky overflow-y-auto',
        className
    )}>
        {children}
    </aside>
)
