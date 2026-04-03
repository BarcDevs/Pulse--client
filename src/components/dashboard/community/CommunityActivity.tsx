'use client'

import Link from 'next/link'

import {cn} from '@/lib/utils'

import {communityPageTexts} from '@/constants/componentTexts/community'

import {CommunityActivityItem} from './CommunityActivityItem'

type CommunityActivityProps = {
    fullHeight?: boolean
}

export const CommunityActivity = ({
    fullHeight = false
}: CommunityActivityProps) => {
    const recommendedCommunityPosts=
        fullHeight ?
            communityPageTexts.activity.list.slice(0, 5) :
            communityPageTexts.activity.list.slice(0, 3)

    return (
        <div className={cn(
            'rounded-2xl bg-surface-card p-5',
            fullHeight && 'h-full'
        )}>
            <div className={'flex items-center justify-between'}>
                <h3 className={'text-sm font-semibold text-foreground'}>
                    {communityPageTexts.activity.title}
                </h3>
                <Link
                    href={'/community'}
                    className={'text-xs font-medium text-primary hover:underline'}
                >
                    {communityPageTexts.activity.viewAll}
                </Link>
            </div>

            <div className={'mt-4 space-y-4'}>
                {recommendedCommunityPosts.map((activity) => (
                    <CommunityActivityItem
                        key={activity.id}
                        avatar={activity.avatar}
                        avatarBg={activity.avatarBg}
                        user={activity.user}
                        action={activity.action}
                        time={activity.time}
                    />
                ))}
            </div>
        </div>
    )
}
