import { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

type PostActionButtonProps = {
    text: string
    onClick: () => void
    icon: LucideIcon
}

export const PostActionButton = ({
    text,
    onClick,
    icon: Icon
}: PostActionButtonProps) => (
    <Button
        variant={'ghost'}
        size={'sm'}
        className={'h-auto gap-1.5 p-1.5 text-xs text-muted-foreground hover:text-primary-light'}
        onClick={onClick}
    >
        <Icon className={'h-4 w-4'}/>
        {text}
    </Button>
)