import Link from 'next/link'

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'

import {
    COMMUNITY_UPDATES
} from '@/constants/communityMockTexts'
import {
    DASHBOARD_COMMUNITY_LABEL,
    DASHBOARD_COMMUNITY_VIEW_ALL
} from '@/constants/dashboardTexts'

const communityUpdates = COMMUNITY_UPDATES.map(
    (update) => ({
        name: update.name,
        action: update.action,
        time: update.timestamp,
        avatar: update.name.charAt(0),
        avatarBg: update.avatarBg
    })
)

export const DashboardCommunity = () => (
    <Card className={'border-0 shadow-sm'}>
        <CardHeader className={'flex flex-row items-center justify-between pb-2'}>
            <CardTitle className={'text-base font-semibold'}>
                {DASHBOARD_COMMUNITY_LABEL}
            </CardTitle>
            <Link
                href={'/community'}
                className={'text-sm font-medium text-primary hover:underline'}
            >
                {DASHBOARD_COMMUNITY_VIEW_ALL}
            </Link>
        </CardHeader>
        <CardContent>
            <div className={'flex flex-col gap-4'}>
                {communityUpdates.map((update, index) => (
                    <div key={index} className={'flex items-center gap-3'}>
                        <Avatar className={'size-9'}>
                            <AvatarImage src={`/avatars/${update.name.toLowerCase()}.jpg`}/>
                            <AvatarFallback
                                className={`${update.avatarBg || 'bg-primary'} text-white`}
                            >
                                {update.avatar}
                            </AvatarFallback>
                        </Avatar>
                        <div className={'flex-1'}>
                            <p className={'text-sm text-foreground'}>
                                <span className={'font-medium'}>
                                    {update.name}
                                </span>
                                {` ${update.action}`}
                            </p>
                            <p className={'text-xs text-muted-foreground'}>
                                {update.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)
