'use client'

import Link from 'next/link'

import {communityPageTexts} from '@/constants/componentTexts/community'

import {CommunityActivityItem} from './CommunityActivityItem'

export const CommunityActivity = () => (
    <div className={'rounded-2xl bg-surface-card p-5'}>
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
            {communityPageTexts.activity.list.map((activity) => (
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
