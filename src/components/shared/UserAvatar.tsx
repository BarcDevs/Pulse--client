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
        <Avatar className={wrapper ?? 'size-9 cursor-pointer'}>
            <AvatarImage
                src={imageSrc}
                className={image}
            />
            <AvatarFallback className={fallback ?? 'bg-primary-light text-primary'}>
                {initials}
            </AvatarFallback>
        </Avatar>
    )
}