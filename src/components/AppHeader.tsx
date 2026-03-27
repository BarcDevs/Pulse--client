import {Bell} from 'lucide-react'

import {UserMenu} from '@/components/header/UserMenu'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'

import {
    HEADER_NOTIFICATION_BADGE_COUNT,
    NOTIFICATIONS_ARIA
} from '@/constants/layoutTexts'

type AppHeaderProps = {
    title: string
    subtitle?: string
}

export const AppHeader = ({
    title,
    subtitle
}: AppHeaderProps) => (
    <header className='sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-surface-card px-4 md:px-6'>
        <div className='flex items-center gap-4'>
            <div>
                <h1 className='text-lg font-semibold text-foreground'>
                    {title}
                </h1>
                {subtitle && (
                    <p className='text-sm text-muted-foreground'>
                        {subtitle}
                    </p>
                )}
            </div>
        </div>

        <div className='flex items-center gap-3'>
            <Button
                variant='ghost'
                size='icon'
                className='relative'
            >
                <Bell
                    className='size-5 text-muted-foreground'
                />
                <Badge className='absolute -right-1 -top-1 size-5 rounded-full p-0 text-[10px]'>
                    {HEADER_NOTIFICATION_BADGE_COUNT}
                </Badge>
                <span className='sr-only'>
                    {NOTIFICATIONS_ARIA}
                </span>
            </Button>
            <UserMenu />
        </div>
    </header>
)