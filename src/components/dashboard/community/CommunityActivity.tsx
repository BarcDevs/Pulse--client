'use client'

import { useRef } from 'react'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { useQuery } from '@tanstack/react-query'

import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorStateCard } from '@/components/shared/ErrorStateCard'

import { useDateLocale } from '@/hooks/ui/useDateLocale'

import { cn } from '@/lib/utils'

import { mapActivityItems } from '@/utils/community'

import { ROUTES } from '@/constants/routes'
import { secondInMs } from '@/constants/time'

import { fetchCommunityRecommendations } from '@/api/forum'
import { communityLocales } from '@/locales/communityLocales'

import { CommunityActivityItem } from './CommunityActivityItem'
import { CommunityActivitySkeletons } from './CommunityActivitySkeletons'

const maxPollAttempts = 5

type CommunityActivityProps = {
    fullHeight?: boolean
}

export const CommunityActivity = ({
    fullHeight = false
}: CommunityActivityProps) => {
    const t = useTranslations()
    const dateLocale = useDateLocale()
    const attemptsRef = useRef(0)

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['forum', 'recommendations'],
        queryFn: async () => {
            attemptsRef.current += 1
            const result = await fetchCommunityRecommendations()
            return result.status === 'processing'
                && attemptsRef.current >= maxPollAttempts
                ? { ...result, status: 'timedOut' }
                : result
        },
        refetchInterval: (query) =>
            query.state.data?.status === 'processing'
                ? 30 * secondInMs : false
    })

    const isProcessing = data?.status === 'processing'
    const pollTimedOut = data?.status === 'timedOut'
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
                    href={ROUTES.COMMUNITY}
                    className={'text-xs font-medium text-primary hover:underline'}
                >
                    {t(communityLocales.activity.viewAll)}
                </Link>
            </div>

            <div className={'mt-4'}>
                {isLoading || isProcessing ? (
                    <CommunityActivitySkeletons count={limit}/>
                ) : isError ? (
                    <ErrorStateCard error={error}/>
                ) : pollTimedOut ? (
                    <EmptyState message={t(communityLocales.activity.empty)}/>
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
