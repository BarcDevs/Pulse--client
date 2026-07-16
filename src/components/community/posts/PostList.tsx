'use client'

import {
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'

import { useTranslations } from 'next-intl'

import type {
    FilterType,
    Post as PostType
} from '@/types/community'

import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorDisplay } from '@/components/shared/ErrorDisplay'
import { Button } from '@/components/ui/button'

import { useForumPosts } from '@/hooks/queries/useForumPosts'

import { cn } from '@/lib/utils'

import { communityLocales } from '@/locales/communityLocales'

import { PostItem } from './postList/PostItem'
import { PostTagFilterBanner } from './postList/PostTagFilterBanner'
import { PostListCategoryFilter } from './PostListCategoryFilter'
import { PostListSkeletons } from './PostListSkeletons'

// todo - move to config
const PAGE_SIZE = 20
const tabs = Object.keys({
    newest: true,
    popular: true,
    unanswered: true
}) as FilterType[]

type PostListProps = {
    tag?: string | null
    search?: string
    onTagSelectAction?: (tag: string | null) => void
    prependPosts?: PostType[]
}

export const PostList = ({
    tag,
    search,
    onTagSelectAction,
    prependPosts
}: PostListProps) => {
    const t = useTranslations()
    const [activeFilter, setActiveFilter] =
        useState<FilterType>('newest')
    const [category, setCategory] =
        useState<string | null>(null)
    const sentinelRef = useRef<HTMLDivElement>(null)

    const query = useMemo(
        () => {
            const q: {
                limit: number
                filter: FilterType
                tag?: string
                category?: string
                search?: string
            } = {
                limit: PAGE_SIZE,
                filter: activeFilter
            }
            if (tag) q.tag = tag
            if (category) q.category = category
            if (search) q.search = search
            return q
        },
        [
            tag,
            category,
            activeFilter,
            search
        ]
    )

    const {
        data,
        isLoading,
        isFetchingNextPage,
        isError,
        error,
        hasNextPage,
        fetchNextPage
    } = useForumPosts(query)

    const allPosts = useMemo(
        () => data?.pages.flat() ?? [],
        [data]
    )

    useEffect(() => {
        const observer =
            new IntersectionObserver(
                (entries) => {
                    if (
                        entries[0].isIntersecting
                        && hasNextPage
                        && !isFetchingNextPage
                    ) {
                        void fetchNextPage()
                    }
                },
                { threshold: 0.1 }
            )

        if (sentinelRef.current) {
            observer.observe(
                sentinelRef.current
            )
        }

        return () =>
            observer.disconnect()
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])


    const handleFilterChange = (
        filter: FilterType
    ) => {
        setActiveFilter(filter)
    }

    const emptyMessage = (
        tag || category
    )
        ? t(communityLocales.posts.emptyWithFilter)
        : t(communityLocales.posts.empty)

    return (
        <div className={'rounded-2xl bg-surface-card overflow-hidden'}>
            <div className={'flex flex-wrap items-center border-b border-border'}>
                <div className={'flex flex-1'}>
                    {tabs.map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => handleFilterChange(tab)}
                            variant={
                                activeFilter === tab
                                    ? 'default'
                                    : 'ghost'
                            }
                            className={cn(
                                'px-4 py-3 text-xs font-medium rounded-none border-b-2',
                                activeFilter === tab
                                    ? 'text-white border-primary'
                                    : 'text-muted-foreground hover:text-foreground border-transparent'
                            )}
                        >
                            {t(communityLocales.posts.filterLabels[tab])}
                        </Button>
                    ))}
                </div>
                <div className={'px-2 py-1.5 shrink-0'}>
                    <PostListCategoryFilter
                        value={category}
                        onChangeAction={setCategory}
                    />
                </div>
            </div>

            {tag && (
                <PostTagFilterBanner
                    tag={tag}
                    onClear={() =>
                        onTagSelectAction?.(null)
                    }
                />
            )}

            <div className={'divide-y divide-border'}>
                {prependPosts?.map((post) => (
                    <PostItem
                        key={post.id}
                        post={post}
                        onTagSelectAction={onTagSelectAction}
                        activeTag={tag}
                    />
                ))}
                {isLoading
                && allPosts.length === 0 ? (
                    <PostListSkeletons/>
                ) : isError ? (
                    <div className={'p-6 flex--center'}>
                        <ErrorDisplay error={error}/>
                    </div>
                ) : allPosts.length === 0 ? (
                    <EmptyState message={emptyMessage}/>
                ) : (
                    <>
                        {allPosts.map(
                            (post) => (
                                <PostItem
                                    key={post.id}
                                    post={post}
                                    onTagSelectAction={
                                        onTagSelectAction
                                    }
                                    activeTag={tag}
                                />
                            )
                        )}
                        {hasNextPage && (
                            <div ref={sentinelRef}>
                                {isFetchingNextPage && (
                                    <PostListSkeletons count={2}/>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
