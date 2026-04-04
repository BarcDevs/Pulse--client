'use client'

import {
    useEffect,
    useRef,
    useState
} from 'react'

import { Button } from '@/components/ui/button'

import { useForumPosts } from '@/hooks/queries/useForumPosts'

import { cn } from '@/lib/utils'

import { communityPageTexts } from '@/constants/componentTexts/community'

import { PostItem } from './postList/PostItem'

const tabs = communityPageTexts.posts.tabs
const PAGE_SIZE = 20

type Post = Parameters<typeof PostItem>[0]['post']

type PostListProps = {
    tag?: string | null
}

export const PostList = ({ tag }: PostListProps) => {
    const [activeTab, setActiveTab] = useState(
        communityPageTexts.posts.defaultTab
    )
    const [allPosts, setAllPosts] = useState<Post[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const sentinelRef = useRef<HTMLDivElement>(null)

    const {
        data,
        isLoading,
        isFetching
    } = useForumPosts({
        limit: PAGE_SIZE,
        page,
        tag: tag || undefined
    })

     
    useEffect(() => {
        const posts = data?.data ?? []
        if (posts.length === 0) return

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAllPosts((prevPosts) => [...prevPosts, ...posts])
        if (posts.length < PAGE_SIZE)
            setHasMore(false)
    }, [data?.data])

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

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAllPosts([])
        setPage(1)
        setHasMore(true)
    }, [tag])

    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
        setAllPosts([])
        setPage(1)
        setHasMore(true)
    }

    return (
        <div className={'rounded-2xl bg-surface-card overflow-hidden'}>
            <div className={'flex border-b border-border'}>
                {tabs.map((tab) => (
                    <Button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        variant={activeTab === tab
                            ? 'default'
                            : 'ghost'}
                        className={cn(
                            'px-6 py-4 text-sm font-medium rounded-none border-b-2',
                            activeTab === tab
                                ? 'text-primary-light border-primary'
                                : 'text-muted-foreground hover:text-primary-light border-transparent'
                        )}
                    >
                        {tab}
                    </Button>
                ))}
            </div>

            <div className={'divide-y divide-border'}>
                {isLoading && allPosts.length === 0 ? (
                    <div className={'p-6 text-center text-muted-foreground'}>
                        {communityPageTexts.posts.loading}
                    </div>
                ) : allPosts.length === 0 ? (
                    <div className={'p-6 text-center text-muted-foreground'}>
                        {communityPageTexts.posts.empty}
                    </div>
                ) : (
                    <>
                        {allPosts.map((post) => (
                            <PostItem
                                key={post.id}
                                post={post}
                            />
                        ))}
                        {hasMore && (
                            <div
                                ref={sentinelRef}
                                className={'p-6 text-center text-muted-foreground'}
                            >
                                {isFetching
                                    ? communityPageTexts.posts.loading
                                    : null}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
