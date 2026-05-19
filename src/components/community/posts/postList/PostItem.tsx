'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Post } from '@/types/community'

import { useDateLocale } from '@/hooks/ui/useDateLocale'

import { toRelative } from '@/lib/time'

import { communityLocales } from '@/locales/communityLocales'

import { PostActions } from './PostActions'
import { PostHeader } from './PostHeader'

type PostItemProps = {
    post: Post
}

const getAuthorName = (post: Post): string => {
    if (!post.author)
        return 'Anonymous'

    const {
        firstName,
        lastName,
        username
    } = post.author.user
    return firstName && lastName
        ? `${firstName} ${lastName}`
        : username
}

export const PostItem = ({ post }: PostItemProps) => {
    const t = useTranslations()
    const dateLocale = useDateLocale()

    return (
        <Link href={`/community/post/${post.id}`}>
            <div className={'p-6 hover:bg-surface-section/50 transition-colors cursor-pointer'}>
                <div className={'flex gap-4'}>
                    <div className={'flex-1 min-w-0'}>
                        <div className={'flex items-start justify-between gap-4 mb-2'}>
                            <div className={'flex-1 min-w-0'}>
                                <PostHeader
                                    category={post.category}
                                    author={getAuthorName(post)}
                                    timeAgo={toRelative(post.createdAt, dateLocale)}
                                />
                            </div>
                            <span className={'text-xs text-muted-foreground whitespace-nowrap'}>
                                {`${post.votes.upvotes} ${t(communityLocales.posts.likedLabel)}`}
                            </span>
                        </div>
                        <h3 className={'font-semibold text-foreground mb-2'}>
                            {post.title}
                        </h3>
                        <p className={'text-sm text-muted-foreground line-clamp-2'}>
                            {post.body}
                        </p>
                        <PostActions
                            replies={Array.isArray(post.replies)
                                ? post.replies.length
                                : post._count?.replies ?? 0
                            }
                        />
                    </div>
                </div>
            </div>
        </Link>
    )
}
