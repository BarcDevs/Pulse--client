import Link from 'next/link'

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { cn } from '@/lib/utils'

import { dashboardPageTexts } from '@/constants/componentTexts/dashboard'

import { COMMUNITY_UPDATES_TRANSFORMED }
    from '@/mocks/communityMockTexts'

export const DashboardCommunity = () => (
    <Card className={'border-0 shadow-sm'}>
        <CardHeader className={'flex flex-row items-center justify-between pb-2'}>
            <CardTitle className={'text-base font-semibold'}>
                {dashboardPageTexts.community.label}
            </CardTitle>
            <Link
                href={'/community'}
                className={'text-sm font-medium text-primary hover:underline'}
            >
                {dashboardPageTexts.community.viewAll}
            </Link>
        </CardHeader>
        <CardContent>
            <div className={'flex flex-col gap-4'}>
                {COMMUNITY_UPDATES_TRANSFORMED.map((update, index) => (
                    <div key={index} className={'flex items-center gap-3'}>
                        <Avatar className={'size-9'}>
                            <AvatarImage src={`/avatars/${update.name.toLowerCase()}.jpg`}/>
                            <AvatarFallback
                                className={cn(update.avatarBg || 'bg-primary', 'text-white')}
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
