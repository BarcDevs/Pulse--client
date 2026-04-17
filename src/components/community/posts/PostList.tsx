'use client'

import {
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'

import type { FilterType } from '@/types/community'

import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/button'

import { useForumPosts } from '@/hooks/queries/useForumPosts'

import { cn } from '@/lib/utils'

import { communityPageTexts } from '@/constants/componentTexts/community'

import { PostItem } from './postList/PostItem'

const PAGE_SIZE = 20
const FILTER_LABELS = communityPageTexts.posts.filterLabels
const tabs = Object.keys(FILTER_LABELS) as FilterType[]

type Post = Parameters<typeof PostItem>[0]['post']

type PostListProps = {
    tag?: string | null
}

export const PostList = ({ tag }: PostListProps) => {
    const [activeFilter, setActiveFilter] = useState<FilterType>('newest')
    const [allPosts, setAllPosts] = useState<Post[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const sentinelRef = useRef<HTMLDivElement>(null)
    const prevQueryRef = useRef<string>('')

    const query = useMemo(() => ({
        limit: PAGE_SIZE,
        page,
        filter: activeFilter,
        ...(tag ? { tag } : {})
    }), [
        page,
        tag,
        activeFilter
    ])

    const {
        data,
        isLoading,
        isFetching
    } = useForumPosts(query)

    useEffect(() => {
        const queryStr = JSON.stringify(query)
        const posts = data?.data ?? []

        // If query changed, reset and start fresh
        if (queryStr !== prevQueryRef.current) {
            prevQueryRef.current = queryStr

            setAllPosts([])
            setPage(1)
            setHasMore(true)
            // Return early and wait for data with new query
            if (posts.length === 0) return
        }

        if (posts.length === 0) return

        // Append posts from current page
        setAllPosts((prevPosts) => [
            ...prevPosts,
            ...posts
        ])
        if (posts.length < PAGE_SIZE)
            setHasMore(false)
    }, [data?.data, query])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting
                    && hasMore
                    && !isFetching
                ) {
                    setPage((prev) => prev + 1)
                }
            },
            { threshold: 0.1 }
        )

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current)
        }

        return () => observer.disconnect()
    }, [hasMore, isFetching])


    const handleFilterChange = (filter: FilterType) => {
        setActiveFilter(filter)
        setAllPosts([])
        setPage(1)
        setHasMore(true)
    }

    const emptyMessage = tag
        ? communityPageTexts.posts.emptyWithFilter(tag)
        : communityPageTexts.posts.empty

    return (
        <div className={'rounded-2xl bg-surface-card overflow-hidden'}>
            <div className={'flex border-b border-border'}>
                {tabs.map((tab) => (
                    <Button
                        key={tab}
                        onClick={() => handleFilterChange(tab)}
                        variant={activeFilter === tab
                            ? 'default'
                            : 'ghost'}
                        className={cn(
                            'px-6 py-4 text-sm font-medium rounded-none border-b-2',
                            activeFilter === tab
                                ? 'text-primary-light border-primary'
                                : 'text-muted-foreground hover:text-primary-light border-transparent'
                        )}
                    >
                        {FILTER_LABELS[tab]}
                    </Button>
                ))}
            </div>

            <div className={'divide-y divide-border'}>
                {isLoading && allPosts.length === 0 ? (
                    <EmptyState
                        message={communityPageTexts.posts.loading}
                    />
                ) : allPosts.length === 0 ? (
                    <EmptyState message={emptyMessage}/>
                ) : (
                    <>
                        {allPosts.map((post) => (
                            <PostItem
                                key={post.id}
                                post={post}
                            />
                        ))}
                        {hasMore && (
                            // todo: add skeleton
                            <div ref={sentinelRef}>
                                {isFetching && (
                                    <EmptyState
                                        message={communityPageTexts.posts.loading}
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
