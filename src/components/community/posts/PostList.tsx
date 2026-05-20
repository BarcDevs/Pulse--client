'use client'

import {
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'

import { useTranslations } from 'next-intl'

import type { FilterType } from '@/types/community'

import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorDisplay } from '@/components/shared/ErrorDisplay'
import { Button } from '@/components/ui/button'

import { useForumPosts } from '@/hooks/queries/useForumPosts'

import { cn } from '@/lib/utils'

import { communityLocales } from '@/locales/communityLocales'

import { PostItem } from './postList/PostItem'
import { PostTagFilterBanner } from './postList/PostTagFilterBanner'
import { PostListCategoryFilter } from './PostListCategoryFilter'

// todo - move to config
const PAGE_SIZE = 20
const tabs = Object.keys({
    newest: true,
    popular: true,
    unanswered: true
}) as FilterType[]

type Post = (
    Parameters<typeof PostItem>[0]
)['post']

type PostListProps = {
    tag?: string | null
    search?: string
    onTagSelectAction?: (tag: string | null) => void
}

export const PostList = ({
    tag,
    search,
    onTagSelectAction
}: PostListProps) => {
    const t = useTranslations()
    // todo: extract post fetch functionality into a hook
    const [activeFilter, setActiveFilter] =
        useState<FilterType>('newest')
    const [category, setCategory] =
        useState<string | null>(null)
    const [allPosts, setAllPosts] =
        useState<Post[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] =
        useState(true)
    const sentinelRef = useRef<
        HTMLDivElement
    >(null)
    const prevQueryRef =
        useRef<string>('')
    const lastFetchedIdRef = useRef<
        string | null
    >(null)

    const query = useMemo(
        () => ({
            limit: PAGE_SIZE,
            page,
            filter: activeFilter,
            ...(tag ? { tag } : {}),
            ...(
                category
                    ? { category }
                    : {}
            ),
            ...(
                search
                    ? { search }
                    : {}
            )
        }),
        [
            page,
            tag,
            category,
            activeFilter,
            search
        ]
    )

    const {
        data,
        isLoading,
        isFetching,
        isError,
        error
    } = useForumPosts(query)

    useEffect(() => {
        const queryStr =
            JSON.stringify(query)
        const posts = data ?? []
        const lastPostId =
            posts[posts.length - 1]?.id
            ?? null

        if (
            queryStr
            !== prevQueryRef.current
        ) {
            prevQueryRef.current = queryStr
            lastFetchedIdRef.current = null

            setAllPosts([])
            setPage(1)
            setHasMore(true)

            if (posts.length === 0) return
        }

        if (
            posts.length === 0
            || (
                lastPostId
                === lastFetchedIdRef.current
            )
        ) return

        lastFetchedIdRef.current = lastPostId
        setAllPosts((prevPosts) => [
            ...prevPosts,
            ...posts
        ])

        if (posts.length < PAGE_SIZE) {
            setTimeout(
                () => setHasMore(false),
                0
            )
        }
    }, [data, query])

    useEffect(() => {
        const observer =
            new IntersectionObserver(
                (entries) => {
                    if (
                        entries[0]
                            .isIntersecting
                        && hasMore
                        && !isFetching
                    ) {
                        setPage(
                            (prev) =>
                                prev + 1
                        )
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
    }, [hasMore, isFetching])


    const handleFilterChange = (
        filter: FilterType
    ) => {
        setActiveFilter(filter)
        setAllPosts([])
        setPage(1)
        setHasMore(true)
    }

    const emptyMessage = (
        tag || category
    )
        ? t(
            communityLocales.posts
                .emptyWithFilter
        )
        : t(
            communityLocales.posts.empty
        )

    return (
        <div
            className={
                'rounded-2xl'
                + ' bg-surface-card'
                + ' overflow-hidden'
            }
        >
            <div
                className={
                    'flex flex-wrap items-center'
                    + ' border-b border-border'
                }
            >
                <div className={'flex flex-1'}>
                    {tabs.map((tab) => (
                        <Button
                            key={tab}
                            onClick={() =>
                                handleFilterChange(
                                    tab
                                )
                            }
                            variant={
                                activeFilter === tab
                                    ? 'default'
                                    : 'ghost'
                            }
                            className={cn(
                                'px-4 py-3'
                                + ' text-xs'
                                + ' font-medium'
                                + ' rounded-none'
                                + ' border-b-2',
                                (
                                    activeFilter
                                    === tab
                                )
                                    ? 'text-white'
                                    + ' border-primary'
                                    : 'text-muted-foreground'
                                    + ' hover:text-foreground'
                                    + ' border-transparent'
                            )}
                        >
                            {t(
                                communityLocales
                                    .posts
                                    .filterLabels[
                                    tab
                                ]
                            )}
                        </Button>
                    ))}
                </div>
                <div className={'px-2 py-1.5 shrink-0'}>
                    <PostListCategoryFilter
                        value={category}
                        onChangeAction={
                            setCategory
                        }
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

            <div
                className={
                    'divide-y divide-border'
                }
            >
                {isLoading
                && allPosts.length === 0 ? (
                    <EmptyState
                        message={t(
                            communityLocales
                                .posts
                                .loading
                        )}
                    />
                ) : isError ? (
                    <div
                        className={
                            'p-6 flex--center'
                        }
                    >
                        <ErrorDisplay
                            error={error}
                        />
                    </div>
                ) : allPosts.length === 0 ? (
                    <EmptyState
                        message={emptyMessage}
                    />
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
                        {hasMore && (
                            <div
                                ref={
                                    sentinelRef
                                }
                            >
                                {isFetching && (
                                    <EmptyState
                                        message={t(
                                            communityLocales
                                                .posts
                                                .loading
                                        )}
                                    />
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
