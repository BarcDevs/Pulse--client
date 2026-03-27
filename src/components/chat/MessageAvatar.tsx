import {
    Avatar,
    AvatarFallback
} from '@/components/ui/avatar'

type MessageAvatarProps = {
    role: 'user' | 'assistant'
    initials?: string
}

export const MessageAvatar = ({
    role,
    initials = 'U'
}: MessageAvatarProps) => (
    <Avatar className={'size-9 shrink-0'}>
        <AvatarFallback className={'bg-primary text-white'}>
            {role === 'assistant' ? 'AI' : initials}
        </AvatarFallback>
    </Avatar>
)
