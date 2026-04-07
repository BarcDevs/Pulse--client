import { UserAvatar } from '@/components/shared/UserAvatar'

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
        className={{
            wrapper: 'size-9 shrink-0',
            fallback: 'bg-primary text-white'
        }}
    />
)
