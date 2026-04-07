'use client'

import { Reply } from '@/types/community'

import { DeleteMenu } from '@/components/community/shared/DeleteMenu'
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar'

import { toRelative } from '@/lib/time'
import { cn } from '@/lib/utils'

import { sanitizeHtml } from '@/utils/sanitizeHtml'

import { communityPageTexts } from '@/constants/componentTexts/community'

type ReplyCardProps = {
    reply: Reply
    currentUserId?: string
    isNested?: boolean
    onDeleteAction: () => Promise<void>
    isDeleting?: boolean
}

export const ReplyCard = ({
    reply,
    currentUserId,
    isNested = false,
    onDeleteAction,
    isDeleting = false
}: ReplyCardProps) => {
    const isOwner = currentUserId === reply.authorId
    const authorName = reply.author
        ? `${reply.author.firstName} ${reply.author.lastName}`
        : 'Unknown'
    const timeAgo = toRelative(new Date(reply.createdAt))
    const sanitizedBody = sanitizeHtml(reply.body)

    return (
        <div
            className={cn(
                'flex gap-3 p-4 rounded-lg border border-border bg-secondary-50',
                isNested
                    ? 'ml-6 border-l-2 border-l-muted'
                    : 'border-l-4 border-l-primary'
            )}
        >
            <Avatar className={'h-8 w-8 flex-shrink-0'}>
                <AvatarImage src={''}/>
                <AvatarFallback>
                    {
                        reply.author?.firstName
                            ?.charAt(0)
                            .toUpperCase()
                    }
                </AvatarFallback>
            </Avatar>

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
                            confirmMessage={communityPageTexts.confirmations.deleteReply}
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
            </div>
        </div>
    )
}
