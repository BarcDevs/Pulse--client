import { X } from 'lucide-react'

import { IconButton } from '@/components/shared/buttons/IconButton'

type CloseButtonProps = {
    className?: string
}

export const CloseButton = ({
    className
}: CloseButtonProps) => (
    <IconButton
        size={'xs'}
        className={className}
    >
        <X className={'size-5'}/>
    </IconButton>
)