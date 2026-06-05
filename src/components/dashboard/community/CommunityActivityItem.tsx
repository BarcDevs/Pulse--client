import Link from 'next/link'

import { UserAvatar } from '@/components/shared/UserAvatar'

type CommunityActivityItemProps = {
    userId: string
    avatar: string
    user: string
    action: string
    time: string
}

export const CommunityActivityItem = ({
    userId,
    avatar,
    user,
    action,
    time
}: CommunityActivityItemProps) => (
    <Link
        href={`/community/post/${userId}`}
        className={'flex items-start gap-3 hover:opacity-80 transition-opacity'}
    >
        <UserAvatar
            initials={avatar}
            className={{ wrapper: 'size-8' }}
        />
        <div className={'flex-1 min-w-0'}>
            <p className={'text-sm text-foreground'}>
                <span className={'font-medium'}>
                    {user}
                </span>
                {` ${action}`}
            </p>
            <p className={'text-xs text-muted-foreground mt-0.5'}>
                {time}
            </p>
        </div>
    </Link>
)
