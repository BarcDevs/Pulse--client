import { cn } from '@/lib/utils'
import { ClassName } from '@/types/react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar'

type UserAvatarProps = {
    initials: string
    imageSrc?: string
    className?: {
        wrapper?: ClassName
        image?: ClassName
        fallback?: ClassName
    }
}

export const UserAvatar = ({
    initials,
    imageSrc,
    className
}: UserAvatarProps) => {
    const {
        wrapper,
        image,
        fallback
    } = className || {}

    return (
        <Avatar className={cn(
            'size-9 cursor-pointer',
            wrapper
        )}>
            <AvatarImage
                src={imageSrc}
                className={image}
            />
            <AvatarFallback className={cn(
                'bg-primary-light text-primary',
                fallback
            )}>
                {initials}
            </AvatarFallback>
        </Avatar>
    )
}