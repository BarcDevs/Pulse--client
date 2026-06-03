'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Heart } from 'lucide-react'

import type { Reply } from '@/types/community'

import { PostForm }
    from '@/components/community/postForm/PostForm'
import { PostActionButton }
    from '@/components/community/posts/postList/PostActionButton'
import { ActionsMenu } from '@/components/shared/ActionsMenu'
import { UserAvatar } from '@/components/shared/UserAvatar'
import { Badge } from '@/components/ui/badge'

import { useReplyInteractions } from '@/hooks/mutations/useReplyInteractions'
import { useDateLocale } from '@/hooks/ui/useDateLocale'

import { toRelative } from '@/lib/time'
import { cn, getUserFallback } from '@/lib/utils'

import { sanitizeHtml } from '@/utils/sanitizeHtml'

import { communityLocales } from '@/locales/communityLocales'
import { PostFormSchema } from '@/validations/forms/postFormSchema'

type ReplyCardProps = {
    reply: Reply
    postId: string
    currentUserId?: string
    postAuthorId?: string
    isNested?: boolean
    onDeleteAction: () => Promise<void>
    onUpdateAction: (
        replyId: string,
        data: PostFormSchema
    ) => Promise<void>
    isDeleting?: boolean
}

export const ReplyCard = ({
    reply,
    postId,
    currentUserId,
    postAuthorId,
    isNested = false,
    onDeleteAction,
    onUpdateAction,
    isDeleting = false
}: ReplyCardProps) => {
    const t = useTranslations()
    const [isEditing, setIsEditing] = useState(false)
    const isOwner = currentUserId === reply.authorId
    const isPostAuthor = !!postAuthorId
        && reply.authorId === postAuthorId
    const {
        liked,
        likeCount,
        toggleLike
    } = useReplyInteractions({
        postId,
        replyId: reply.id,
        initialLikes: reply._count?.likes ?? 0
    })
    const dateLocale = useDateLocale()
    const authorUser = reply.author?.user
    const authorName = authorUser
        ? (authorUser.firstName && authorUser.lastName
            ? `${authorUser.firstName} ${authorUser.lastName}`
            : authorUser.username)
        : 'Unknown'
    const timeAgo = toRelative(
        new Date(reply.createdAt),
        dateLocale
    )
    const sanitizedBody = sanitizeHtml(reply.body)
    const isEdited = reply.updatedAt !== null

    const { author } = reply
    const initials = authorUser && getUserFallback(
        authorUser.firstName,
        authorUser.lastName
    )

    const handleUpdate = (
        data: PostFormSchema
    ): Promise<void> => {
        setIsEditing(false)
        return onUpdateAction(reply.id, data)
    }

    const editReplyLabel = t(
        communityLocales.postActions.editReply
    )
    const deleteReplyLabel = t(
        communityLocales.postActions.deleteReply
    )
    const cancelLabel = t(
        communityLocales.postForm.cancel
    )
    const deleteReplyTitle = t(
        communityLocales.confirmations.deleteReplyTitle
    )
    const deleteReplyDesc = t(
        communityLocales.confirmations.deleteReplyDescription
    )

    return (
        <div className={cn(
            'flex gap-3 p-4 rounded-lg border border-border bg-secondary-50',
            isNested
                ? 'ml-6 border-l-2 border-l-muted'
                : 'border-l-4 border-l-primary'
        )}>
            {initials && (
                <UserAvatar
                    initials={initials}
                    imageSrc={author?.image ?? undefined}
                />
            )}

            <div className={'flex-1 min-w-0'}>
                <div className={'flex items-center justify-between gap-2 mb-1'}>
                    <div className={'flex items-center gap-2 min-w-0'}>
                        <span className={'font-semibold text-sm truncate'}>
                            {authorName}
                        </span>
                        {isPostAuthor && (
                            <Badge className={'bg-primary-light text-primary hover:bg-primary-light text-xs px-1.5 py-0 font-medium'}>
                                {t(communityLocales.postDetail.authorBadge)}
                            </Badge>
                        )}
                        <span className={'text-xs text-muted-foreground whitespace-nowrap'}>
                            {timeAgo}
                            {isEdited && (
                                <span className={'italic ml-1'}>
                                    {t(communityLocales.posts.edited)}
                                </span>
                            )}
                        </span>
                    </div>

                    {isOwner && !isEditing && (
                        <ActionsMenu
                            onEditAction={() =>
                                setIsEditing(true)
                            }
                            onDeleteAction={onDeleteAction}
                            isLoading={isDeleting}
                            editLabel={editReplyLabel}
                            deleteLabel={deleteReplyLabel}
                            cancelLabel={cancelLabel}
                            confirmTitle={deleteReplyTitle}
                            confirmDescription={deleteReplyDesc}
                        />
                    )}
                </div>

                {isEditing ? (
                    <PostForm
                        isReply={true}
                        isOpen={true}
                        isLoading={isDeleting}
                        onSubmitAction={handleUpdate}
                        onCancelAction={() => setIsEditing(false)}
                        defaultValues={{ body: reply.body }}
                        submitLabel={t(communityLocales.postForm.saveChanges)}
                        hideHeader={true}
                    />
                ) : (
                    <div
                        className={'prose prose-sm max-w-none text-sm'}
                        dangerouslySetInnerHTML={{
                            __html: sanitizedBody
                        }}
                    />
                )}

                {!isEditing && (
                    <div className={'flex items-center gap-1 mt-2'}>
                        <PostActionButton
                            icon={Heart}
                            count={likeCount}
                            isActive={liked}
                            activeClassName={'text-rose-600 hover:text-rose-600'}
                            onClick={toggleLike}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
