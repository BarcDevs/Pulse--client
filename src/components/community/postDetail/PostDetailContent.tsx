'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { isAxiosError } from 'axios'
import { ArrowLeft } from 'lucide-react'

import { useQueryClient } from '@tanstack/react-query'

import { Post } from '@/types/community'

import { PostDetailActions } from '@/components/community/postDetail/PostDetailActions'
import { PostDetailCard } from '@/components/community/postDetail/PostDetailCard'
import { PostDetailSkeletons } from '@/components/community/postDetail/PostDetailSkeletons'
import { PostNotFound } from '@/components/community/postDetail/PostNotFound'
import { RepliesSection } from '@/components/community/postDetail/RepliesSection'
import { PostForm } from '@/components/community/postForm/PostForm'
import { ErrorDisplay } from '@/components/shared/ErrorDisplay'

import { useForumPostMutations } from '@/hooks/mutations/useForumPostMutations'
import { useForumPost } from '@/hooks/queries/useForumPost'
import { useDateLocale } from '@/hooks/ui/useDateLocale'
import { useAuthExpiredToast } from '@/hooks/useAuthExpiredToast'

import { toRelative } from '@/lib/time'

import { getAuthorDisplayName } from '@/utils/community'
import {
    clearDraft,
    DRAFT_KEYS,
    getDraft,
    saveDraft
} from '@/utils/communityDraft'
import { withOptimisticToast } from '@/utils/optimisticToast'
import { sanitizeHtml } from '@/utils/sanitizeHtml'

import { forumQueryKeys } from '@/constants/queryKeys'
import { ROUTES } from '@/constants/routes'

import { usePostDetail } from '@/context/PostDetailContext'

import { communityLocales } from '@/locales/communityLocales'
import { globalLocales } from '@/locales/globalLocales'
import { PostFormSchema } from '@/validations/forms/postFormSchema'

export const PostDetailContent = () => {
    const {
        postId,
        isEditingPost,
        setIsEditingPost
    } = usePostDetail()
    const router = useRouter()
    const t = useTranslations()
    const dateLocale = useDateLocale()
    const queryClient = useQueryClient()
    const { updatePost } = useForumPostMutations({ postId })
    const { showAuthExpiredWithDraft } = useAuthExpiredToast()

    const {
        data: post,
        isLoading: isPostLoading,
        isError: isPostError,
        error: postError
    } = useForumPost(postId)

    if (isPostLoading) return <PostDetailSkeletons/>

    if (isPostError) {
        const isNotFound =
            isAxiosError(postError)
            && postError.response?.status === 404

        if (isNotFound) return <PostNotFound/>
        return <ErrorDisplay error={postError}/>
    }

    const sanitizedBody = post ? sanitizeHtml(post.body) : ''

    const author = post
        ? getAuthorDisplayName(post.author, 'Unknown')
        : ''

    const timeAgo = post
        ? toRelative(new Date(post.createdAt), dateLocale) : ''

    const handleTagSelect = (
        tag: string | null
    ) => {
        const url = tag
            ? `${ROUTES.COMMUNITY}?tag=${encodeURIComponent(tag)}`
            : ROUTES.COMMUNITY
        router.push(url)
    }

    const handleUpdatePost = (data: PostFormSchema): Promise<void> => {
        const snapshot = queryClient.getQueryData<Post>(
            forumQueryKeys.post(postId)
        )
        queryClient.setQueryData(
            forumQueryKeys.post(postId),
            (old: Post | undefined) => {
                if (!old) return old
                return {
                    ...old,
                    title: data.title ?? old.title,
                    body: data.body,
                    category: data.category ?? old.category,
                    tags: (data.tags ?? []).map(
                        (slug) => ({ id: slug, slug })
                    ),
                    updatedAt: new Date()
                }
            }
        )
        setIsEditingPost(false)

        const successMsg = t(
            communityLocales.toasts.postUpdated
        )
        const errorMsg = t(
            communityLocales.toasts.postUpdateFailed
        )
        const retryLabel = t(
            globalLocales.shared.retry
        )

        return withOptimisticToast({
            action: updatePost.mutateAsync(data),
            successMsg,
            errorMsg,
            retryLabel,
            onRetry: () => void handleUpdatePost(data),
            onSuccess: () => clearDraft(DRAFT_KEYS.updatePost(postId)),
            onError: () => {
                queryClient.setQueryData(
                    forumQueryKeys.post(postId),
                    snapshot
                )
            },
            onUnauthorized: () => {
                queryClient.setQueryData(
                    forumQueryKeys.post(postId),
                    snapshot
                )
                saveDraft(
                    DRAFT_KEYS.updatePost(postId),
                    'updatePost',
                    data,
                    postId
                )
                showAuthExpiredWithDraft()
            }
        })
    }

    const tagDefaultValues = post && Array.isArray(post.tags)
        ? post.tags.map((tag) => tag.slug)
        : []

    const editDraft = getDraft(DRAFT_KEYS.updatePost(postId))

    return (
        <div className={'space-y-6'}>
            <Link
                href={ROUTES.COMMUNITY}
                className={'inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors'}
            >
                <ArrowLeft className={'h-4 w-4'}/>
                {t(communityLocales.postDetail.backToCommunity)}
            </Link>

            <div className={'relative rounded-2xl bg-surface-card shadow-sm overflow-hidden'}>
                {isEditingPost && post ? (
                    <PostForm
                        isReply={false}
                        isOpen={true}
                        isLoading={updatePost.isPending}
                        onSubmitAction={handleUpdatePost}
                        onCancelAction={() => setIsEditingPost(false)}
                        defaultValues={editDraft?.data ?? {
                            title: post.title,
                            category: post.category,
                            body: post.body,
                            tags: tagDefaultValues
                        }}
                        submitLabel={t(communityLocales.postForm.saveChanges)}
                        hideHeader={true}
                    />
                ) : (
                    <>
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
                    </>
                )}
            </div>

            <RepliesSection
                postId={postId}
                postAuthorId={post?.authorId}
            />
        </div>
    )
}
