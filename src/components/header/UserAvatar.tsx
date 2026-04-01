import {
    Avatar,
    AvatarFallback
} from '@/components/ui/avatar'

type UserAvatarProps = {
    firstName: string
    lastName: string
    initials: string
}

export const UserAvatar = ({
    firstName,
    lastName,
    initials
}: UserAvatarProps) => (
    <button className={'flex items-center gap-3 rounded-lg p-2 hover:bg-surface-section transition-colors'}>
        <Avatar className={'size-9'}>
            <AvatarFallback className={'bg-primary-light text-primary'}>
                {initials}
            </AvatarFallback>
        </Avatar>
        <div className={'hidden md:flex flex-col items-start'}>
            <p className={'text-sm font-medium text-foreground'}>
                {firstName}
            </p>
            <p className={'text-xs text-muted-foreground'}>
                {firstName} {lastName}
            </p>
        </div>
    </button>
)