import { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

type PostActionButtonProps = {
    text?: string
    onClick: () => void
    icon: LucideIcon
    count?: number
    isActive?: boolean
    activeClassName?: string
}

export const PostActionButton = ({
    text,
    onClick,
    icon: Icon,
    count,
    isActive,
    activeClassName = 'text-primary'
}: PostActionButtonProps) => (
    <Button
        variant={'ghost'}
        size={'sm'}
        className={cn(
            'h-auto gap-1.5 p-1.5 text-xs hover:text-primary',
            isActive ? activeClassName : 'text-muted-foreground'
        )}
        onClick={onClick}
    >
        <Icon className={cn(
            'h-4 w-4',
            isActive && 'fill-current'
        )}
        />
        {count !== undefined && (
            <span>
                {count}
            </span>
        )}
        {text}
    </Button>
)
