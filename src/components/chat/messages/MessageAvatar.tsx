import { UserAvatar } from '@/components/shared/avatars/UserAvatar'

type MessageAvatarProps = {
    role: 'user' | 'assistant'
    initials?: string
}

export const MessageAvatar = ({
    role,
    initials = 'U'
}: MessageAvatarProps) => (
    <UserAvatar
        initials={role === 'assistant' ? 'AI' : initials}
        tone={'solid'}
        className={'shrink-0'}
    />
)
