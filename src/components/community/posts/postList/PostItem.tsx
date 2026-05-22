'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Heart } from 'lucide-react'

import { Post } from '@/types/community'

import { useDateLocale } from '@/hooks/ui/useDateLocale'

import { toRelative } from '@/lib/time'

import { stripHtml } from '@/utils/sanitizeHtml'

import { communityLocales } from '@/locales/communityLocales'

import { PostActions } from './PostActions'
import { PostHeader } from './PostHeader'
import { PostTags } from './PostTags'

type PostItemProps = {
    post: Post
    onTagSelectAction?: (
        tag: string | null
    ) => void
    activeTag?: string | null
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

export const PostItem = ({
    post,
    onTagSelectAction,
    activeTag
}: PostItemProps) => {
    const t = useTranslations()
    const dateLocale = useDateLocale()
    const tags = Array.isArray(post.tags)
        ? post.tags
        : []
    const replies = Array.isArray(
        post.replies
    )
        ? post.replies.length
        : post._count?.replies ?? 0

    return (
        <div
            className={
                'p-6'
                + ' hover:bg-surface-section/50'
                + ' transition-colors'
            }
        >
            <Link
                href={
                    `/community/post/${post.id}`
                }
                className={'block'}
            >
                <div
                    className={
                        'flex items-start'
                        + ' justify-between'
                        + ' gap-4 mb-2'
                    }
                >
                    <PostHeader
                        category={
                            post.category
                        }
                        author={getAuthorName(
                            post
                        )}
                        timeAgo={toRelative(
                            post.createdAt,
                            dateLocale
                        )}
                    />
                    <span
                        className={
                            'flex items-center'
                            + ' gap-1 text-xs'
                            + ' whitespace-nowrap'
                        }
                    >
                        <Heart
                            className={
                                'h-3 w-3'
                                + ' text-rose-400'
                            }
                        />
                        <span
                            className={
                                'font-semibold'
                                + ' text-foreground'
                            }
                        >
                            {post._count?.likes ?? 0}
                        </span>
                        <span
                            className={
                                'text-muted-foreground'
                            }
                        >
                            {t(
                                communityLocales
                                    .posts
                                    .likedLabel
                            )}
                        </span>
                    </span>
                </div>
                <h3
                    className={
                        'font-semibold'
                        + ' text-foreground'
                        + ' mb-2'
                    }
                >
                    {post.title}
                </h3>
                <p
                    className={
                        'text-sm'
                        + ' text-muted-foreground'
                        + ' line-clamp-2'
                    }
                >
                    {stripHtml(post.body)}
                </p>
            </Link>
            {tags.length > 0 && (
                <PostTags
                    tags={tags}
                    onTagSelectAction={
                        onTagSelectAction
                    }
                    activeTag={activeTag}
                />
            )}
            <PostActions
                postId={post.id}
                replies={replies}
            />
        </div>
    )
}
