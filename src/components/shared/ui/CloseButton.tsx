import {X} from 'lucide-react'

import {Button} from '@/components/ui/button'

type CloseButtonProps = {
    className?: string
}

export const CloseButton = ({
    className = 'h-6 w-6 p-0 text-muted-foreground hover:text-foreground'
}: CloseButtonProps) => (
    <Button
        variant={'ghost'}
        size={'sm'}
        className={className}
    >
        <X className={'size-5'}/>
    </Button>
)