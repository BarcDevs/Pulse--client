import { ClassName } from '@/types/react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar'

import { cn } from '@/lib/utils'

type UserAvatarSize = 'sm' | 'md' | 'xl'
type UserAvatarTone = 'soft' | 'solid'

type UserAvatarProps = {
    initials: string
    imageSrc?: string
    size?: UserAvatarSize
    tone?: UserAvatarTone
    className?: ClassName
}

const sizeStyles: Record<UserAvatarSize, { wrapper: string, fallback: string }> = {
    sm: { wrapper: 'size-8', fallback: '' },
    md: { wrapper: 'size-9', fallback: '' },
    xl: { wrapper: 'size-24 border-4 border-primary-light', fallback: 'text-2xl' }
}

const toneStyles: Record<UserAvatarTone, string> = {
    soft: 'bg-primary-light text-primary',
    solid: 'bg-primary text-white'
}

export const UserAvatar = ({
    initials,
    imageSrc,
    size = 'md',
    tone = 'soft',
    className
}: UserAvatarProps) => (
    <Avatar className={cn(sizeStyles[size].wrapper, className)}>
        <AvatarImage src={imageSrc}/>
        <AvatarFallback className={cn(toneStyles[tone], sizeStyles[size].fallback)}>
            {initials}
        </AvatarFallback>
    </Avatar>
)
