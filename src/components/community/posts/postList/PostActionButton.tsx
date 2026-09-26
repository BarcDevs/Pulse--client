import { LucideIcon } from 'lucide-react'

import { TextButton } from '@/components/shared/buttons/TextButton'

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
    <TextButton
        tone={'action'}
        size={'xs'}
        className={cn(
            'gap-1.5 p-1.5',
            isActive && activeClassName
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
    </TextButton>
)
