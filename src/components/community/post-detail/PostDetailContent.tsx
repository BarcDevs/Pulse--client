'use client'

import { isAxiosError } from 'axios'

import { PostDetailActions } from '@/components/community/post-detail/PostDetailActions'
import { PostDetailCard } from '@/components/community/post-detail/PostDetailCard'
import { PostNotFound } from '@/components/community/post-detail/PostNotFound'
import { RepliesSection } from '@/components/community/post-detail/RepliesSection'
import { ErrorStateCard } from '@/components/community/shared/ErrorStateCard'
import { Skeleton } from '@/components/ui/skeleton'

import { useForumPost } from '@/hooks/queries/useForumPost'

import { toRelative } from '@/lib/time'

import { sanitizeHtml } from '@/utils/sanitizeHtml'

import { communityPageTexts } from '@/constants/componentTexts/community'
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
            isAxiosError(postError) &&
            postError.response?.status === 404
        if (isNotFound) return <PostNotFound/>
        return (
            <ErrorStateCard
                message={communityPageTexts.postDetail.postLoadError}
            />
        )
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
            <PostDetailCard
                post={post}
                sanitizedBody={sanitizedBody}
                categoryColor={categoryColor}
                author={author}
                timeAgo={timeAgo}
            />
            <PostDetailActions postId={postId} post={post}/>
            <RepliesSection postId={postId}/>
        </div>
    )
}
