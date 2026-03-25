'use client'

import Link from 'next/link'

import {cn} from '@/lib/utils'

import {
    COMMUNITY_ACTIVITY_LIST,
    COMMUNITY_ACTIVITY_TITLE,
    COMMUNITY_ACTIVITY_VIEW_ALL
} from '@/constants/communityTexts'

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
                <div key={activity.id} className={'flex items-start gap-3'}>
                    <div className={cn('h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium', activity.avatarBg)}>
                        {activity.avatar}
                    </div>
                    <div className={'flex-1 min-w-0'}>
                        <p className={'text-sm text-foreground'}>
                            <span className={'font-medium'}>
                                {activity.user}
                            </span>
                            {` ${activity.action}`}
                        </p>
                        <p className={'text-xs text-muted-foreground mt-0.5'}>
                            {activity.time}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
)
