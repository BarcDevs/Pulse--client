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
    <button className={'flex items-center gap-3 rounded-lg p-2 hover:bg-surface-section transition-colors'}>
        <Avatar className={'size-9 cursor-pointer'}>
            <AvatarFallback className={'bg-primary-light text-primary'}>
                {initials}
            </AvatarFallback>
        </Avatar>
    </button>
)