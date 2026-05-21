'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { isAxiosError } from 'axios'
import { ArrowLeft } from 'lucide-react'

import { PostDetailActions }
    from '@/components/community/postDetail/PostDetailActions'
import { PostDetailCard }
    from '@/components/community/postDetail/PostDetailCard'
import { PostNotFound }
    from '@/components/community/postDetail/PostNotFound'
import { RepliesSection }
    from '@/components/community/postDetail/RepliesSection'
import { ErrorDisplay } from '@/components/shared/ErrorDisplay'
import { Skeleton } from '@/components/ui/skeleton'

import { useForumPost } from '@/hooks/queries/useForumPost'
import { useDateLocale } from '@/hooks/ui/useDateLocale'

import { toRelative } from '@/lib/time'

import { sanitizeHtml } from '@/utils/sanitizeHtml'

import { usePostDetail } from '@/context/PostDetailContext'

import { communityLocales } from '@/locales/communityLocales'

export const PostDetailContent = () => {
    const { postId } = usePostDetail()
    const router = useRouter()
    const t = useTranslations()
    const dateLocale = useDateLocale()
    const {
        data: post,
        isLoading: isPostLoading,
        isError: isPostError,
        error: postError
    } = useForumPost(postId)

    if (isPostLoading) {
        return (
            <div className={'space-y-6'}>
                <Skeleton className={'h-48 rounded-2xl'}/>
                <Skeleton className={'h-32 rounded-2xl'}/>
                <Skeleton className={'h-96 rounded-2xl'}/>
            </div>
        )
    }

    if (isPostError) {
        const isNotFound =
            isAxiosError(postError)
            && postError.response?.status === 404

        if (isNotFound) return <PostNotFound/>
        return <ErrorDisplay error={postError}/>
    }

    const sanitizedBody = post ? sanitizeHtml(post.body) : ''

    const author = post
        ? (post.author
            ? (post.author.user.firstName && post.author.user.lastName
                ? `${post.author.user.firstName} ${post.author.user.lastName}`
                : post.author.user.username)
            : 'Unknown') : ''

    const timeAgo = post
        ? toRelative(new Date(post.createdAt), dateLocale) : ''

    const handleTagSelect = (tag: string | null) => {
        router.push(tag ? `/community?tag=${encodeURIComponent(tag)}` : '/community')
    }

    return (
        <div className={'space-y-6'}>
            <Link
                href={'/community'}
                className={'inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors'}
            >
                <ArrowLeft className={'h-4 w-4'}/>
                {t(communityLocales.postDetail.backToCommunity)}
            </Link>

            <div className={'rounded-2xl bg-surface-card shadow-sm overflow-hidden'}>
                <PostDetailCard
                    post={post}
                    sanitizedBody={sanitizedBody}
                    author={author}
                    timeAgo={timeAgo}
                    onTagSelectAction={handleTagSelect}
                />
                <PostDetailActions
                    postId={postId}
                    post={post}
                />
            </div>

            <RepliesSection postId={postId}/>
        </div>
    )
}
