import {
    Avatar,
    AvatarFallback
} from '@/components/ui/avatar'

type UserAvatarProps = {
    initials: string
}

export const UserAvatar = ({
    initials
}: UserAvatarProps) => (
    <Avatar className={'size-9 cursor-pointer'}>
        <AvatarFallback className={'bg-primary-light text-primary'}>
            {initials}
        </AvatarFallback>
    </Avatar>
)