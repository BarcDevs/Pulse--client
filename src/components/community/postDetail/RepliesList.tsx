'use client'

import { Reply } from '@/types/community'

import { ReplyCard } from '@/components/community/postDetail/ReplyCard'

type RepliesListProps = {
    replies: Reply[]
    currentUserId?: string
    onDeleteReply: (replyId: string) => Promise<void>
    isDeleting: boolean
}

export const RepliesList = ({
    replies,
    currentUserId,
    onDeleteReply,
    isDeleting
}: RepliesListProps) => (
    <div className={'space-y-3'}>
        {replies.map(
            (reply) => (
                <ReplyCard
                    key={reply.id}
                    reply={reply}
                    currentUserId={currentUserId}
                    onDeleteAction={() => onDeleteReply(reply.id)}
                    isDeleting={isDeleting}
                />
            )
        )}
    </div>
)
