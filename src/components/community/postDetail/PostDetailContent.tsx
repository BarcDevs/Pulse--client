'use client'

import { isAxiosError } from 'axios'

import { PostDetailActions } from '@/components/community/postDetail/PostDetailActions'
import { PostDetailCard } from '@/components/community/postDetail/PostDetailCard'
import { PostNotFound } from '@/components/community/postDetail/PostNotFound'
import { RepliesSection } from '@/components/community/postDetail/RepliesSection'
import { ErrorDisplay } from '@/components/shared/ErrorDisplay'
import { Skeleton } from '@/components/ui/skeleton'

import { useForumPost } from '@/hooks/queries/useForumPost'

import { toRelative } from '@/lib/time'

import { sanitizeHtml } from '@/utils/sanitizeHtml'

import { communityCategoriesColorMap }
    from '@/constants/mappings/community'

import { usePostDetail } from '@/context/PostDetailContext'

export const PostDetailContent = () => {
    const { postId } = usePostDetail()
    const {
        data: post,
        isLoading: isPostLoading,
        isError: isPostError,
        error: postError
    } = useForumPost(postId)

    if (isPostLoading) {
        return (
            <div className={'space-y-6'}>
                <Skeleton className={'h-48 rounded-lg'}/>
                <Skeleton className={'h-32 rounded-lg'}/>
                <Skeleton className={'h-96 rounded-lg'}/>
            </div>
        )
    }

    if (isPostError) {
        const isNotFound =
            isAxiosError(postError)
            && postError.response?.status === 404

        if (isNotFound)
            return <PostNotFound/>

        return <ErrorDisplay error={postError}/>
    }

    const sanitizedBody = post
        ? sanitizeHtml(post.body)
        : ''
    const categoryColor = post
        ? (communityCategoriesColorMap[post.category]
            || 'bg-gray-50 text-gray-700')
        : ''
    const author = post
        ? (post.author
            ? `${post.author.firstName} ${post.author.lastName}`
            : 'Unknown')
        : ''
    const timeAgo = post
        ? toRelative(new Date(post.createdAt))
        : ''

    return (
        <div className={'space-y-6'}>
            <div>
                <PostDetailCard
                    post={post}
                    sanitizedBody={sanitizedBody}
                    categoryColor={categoryColor}
                    author={author}
                    timeAgo={timeAgo}
                />
                <PostDetailActions
                    postId={postId}
                    post={post}
                />
            </div>
            <div className={'px-6'}>
                <RepliesSection postId={postId}/>
            </div>
        </div>
    )
}
