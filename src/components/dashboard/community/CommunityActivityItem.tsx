import { cn } from '@/lib/utils'

type CommunityActivityItemProps = {
    avatar: string
    avatarBg: string
    user: string
    action: string
    time: string
}

export const CommunityActivityItem = ({
    avatar,
    avatarBg,
    user,
    action,
    time
}: CommunityActivityItemProps) => (
    <div className={'flex items-start gap-3'}>
        <div className={cn(
            'h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium',
            avatarBg
        )}>
            {avatar}
        </div>
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
    </div>
)
