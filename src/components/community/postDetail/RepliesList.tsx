'use client'

import { Reply } from '@/types/community'

import { ReplyCard } from '@/components/community/postDetail/ReplyCard'

import { PostFormSchema } from '@/validations/forms/postFormSchema'

type RepliesListProps = {
    replies: Reply[]
    postId: string
    currentUserId?: string
    postAuthorId?: string
    onDeleteReplyAction: (replyId: string) => Promise<void>
    onUpdateReplyAction: (
        replyId: string,
        data: PostFormSchema
    ) => Promise<void>
    isDeleting: boolean
}

export const RepliesList = ({
    replies,
    postId,
    currentUserId,
    postAuthorId,
    onDeleteReplyAction,
    onUpdateReplyAction,
    isDeleting
}: RepliesListProps) => (
    <div className={'space-y-3'}>
        {replies.map(
            (reply) => (
                <ReplyCard
                    key={reply.id}
                    reply={reply}
                    postId={postId}
                    currentUserId={currentUserId}
                    postAuthorId={postAuthorId}
                    onDeleteAction={() => onDeleteReplyAction(reply.id)}
                    onUpdateAction={onUpdateReplyAction}
                    isDeleting={isDeleting}
                />
            )
        )}
    </div>
)
