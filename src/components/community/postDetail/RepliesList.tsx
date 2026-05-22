'use client'

import { Reply } from '@/types/community'

import { ReplyCard } from '@/components/community/postDetail/ReplyCard'

type RepliesListProps = {
    replies: Reply[]
    postId: string
    currentUserId?: string
    onDeleteReplyAction: (replyId: string) => Promise<void>
    isDeleting: boolean
}

export const RepliesList = ({
    replies,
    postId,
    currentUserId,
    onDeleteReplyAction,
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
                    onDeleteAction={() => onDeleteReplyAction(reply.id)}
                    isDeleting={isDeleting}
                />
            )
        )}
    </div>
)
