'use client'

import { useTranslations } from 'next-intl'

import { Heart } from 'lucide-react'

import { Reply } from '@/types/community'

import { PostActionButton }
    from '@/components/community/posts/postList/PostActionButton'
import { DeleteMenu } from '@/components/shared/DeleteMenu'
import { UserAvatar } from '@/components/shared/UserAvatar'

import { useReplyInteractions } from '@/hooks/mutations/useReplyInteractions'
import { useDateLocale } from '@/hooks/ui/useDateLocale'

import { toRelative } from '@/lib/time'
import { cn, getUserFallback } from '@/lib/utils'

import { sanitizeHtml } from '@/utils/sanitizeHtml'

import { communityLocales } from '@/locales/communityLocales'

type ReplyCardProps = {
    reply: Reply
    postId: string
    currentUserId?: string
    isNested?: boolean
    onDeleteAction: () => Promise<void>
    isDeleting?: boolean
}

export const ReplyCard = ({
    reply,
    postId,
    currentUserId,
    isNested = false,
    onDeleteAction,
    isDeleting = false
}: ReplyCardProps) => {
    const t = useTranslations()
    const isOwner = currentUserId === reply.authorId
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
    const timeAgo = toRelative(new Date(reply.createdAt), dateLocale)
    const sanitizedBody = sanitizeHtml(reply.body)

    const { author } = reply
    const initials = authorUser && getUserFallback(
        authorUser.firstName,
        authorUser.lastName
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
                        <span className={'text-xs text-muted-foreground whitespace-nowrap'}>
                            {timeAgo}
                        </span>
                    </div>

                    {isOwner && (
                        <DeleteMenu
                            onDeleteAction={onDeleteAction}
                            confirmMessage={t(communityLocales.confirmations.deleteReply)}
                            isLoading={isDeleting}
                        />
                    )}
                </div>

                <div
                    className={'prose prose-sm max-w-none text-sm'}
                    dangerouslySetInnerHTML={{
                        __html: sanitizedBody
                    }}
                />

                <div className={'flex items-center gap-1 mt-2'}>
                    <PostActionButton
                        icon={Heart}
                        count={likeCount}
                        isActive={liked}
                        activeClassName={'text-rose-600 hover:text-rose-600'}
                        onClick={toggleLike}
                    />
                </div>
            </div>
        </div>
    )
}
