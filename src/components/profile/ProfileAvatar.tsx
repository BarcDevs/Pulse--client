import {
    Avatar,
    AvatarFallback
} from '@/components/ui/avatar'

type ProfileAvatarProps = {
    initials: string
}

export const ProfileAvatar = ({
    initials
}: ProfileAvatarProps) => (
    <div className={'relative'}>
        <Avatar className={'size-24 border-4 border-primary-light'}>
            <AvatarFallback className={'bg-primary text-2xl text-white'}>
                {initials}
            </AvatarFallback>
        </Avatar>
        <div className={'absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border-2 border-white bg-secondary text-xs font-bold text-white'}>
            4
        </div>
    </div>
)
