'use client'

import Link from 'next/link'

import {
    COMMUNITY_ACTIVITY_LIST,
    COMMUNITY_ACTIVITY_TITLE,
    COMMUNITY_ACTIVITY_VIEW_ALL
} from '@/constants/communityTexts'

import {CommunityActivityItem} from './CommunityActivityItem'

export const CommunityActivity = () => (
    <div className={'rounded-2xl bg-surface-card p-5'}>
        <div className={'flex items-center justify-between'}>
            <h3 className={'text-sm font-semibold text-foreground'}>
                {COMMUNITY_ACTIVITY_TITLE}
            </h3>
            <Link
                href={'/community'}
                className={'text-xs font-medium text-primary hover:underline'}
            >
                {COMMUNITY_ACTIVITY_VIEW_ALL}
            </Link>
        </div>

        <div className={'mt-4 space-y-4'}>
            {COMMUNITY_ACTIVITY_LIST.map((activity) => (
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
