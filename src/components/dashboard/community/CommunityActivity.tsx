'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { useQuery } from '@tanstack/react-query'

import { ErrorStateCard } from '@/components/shared/ErrorStateCard'

import { useDateLocale } from '@/hooks/ui/useDateLocale'

import { cn } from '@/lib/utils'

import { mapActivityItems } from '@/utils/community'

import { fetchCommunityRecommendations } from '@/api/forum'
import { communityLocales } from '@/locales/communityLocales'

import { CommunityActivityItem } from './CommunityActivityItem'
import { CommunityActivitySkeletons } from './CommunityActivitySkeletons'

type CommunityActivityProps = {
    fullHeight?: boolean
}

export const CommunityActivity = ({
    fullHeight = false
}: CommunityActivityProps) => {
    const t = useTranslations()
    const dateLocale = useDateLocale()

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['forum', 'recommendations'],
        queryFn: fetchCommunityRecommendations
    })

    const limit = fullHeight ? 5 : 3
    const posts = mapActivityItems(
        data?.posts || [],
        t,
        dateLocale,
        limit
    )

    return (
        <div className={cn(
            'rounded-2xl bg-surface-card p-5',
            fullHeight && 'h-full'
        )}>
            <div className={'flex-center-between'}>
                <h3 className={'text-sm font-semibold text-foreground'}>
                    {t(communityLocales.activity.title)}
                </h3>
                <Link
                    href={'/community'}
                    className={'text-xs font-medium text-primary hover:underline'}
                >
                    {t(communityLocales.activity.viewAll)}
                </Link>
            </div>

            <div className={'mt-4'}>
                {isLoading ? (
                    <CommunityActivitySkeletons count={limit}/>
                ) : isError ? (
                    <ErrorStateCard error={error}/>
                ) : (
                    <div className={'space-y-4'}>
                        {posts.map((activity) => (
                            <CommunityActivityItem
                                key={activity.id}
                                userId={activity.id}
                                avatar={activity.avatar}
                                user={activity.user}
                                action={activity.action}
                                time={activity.time}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
