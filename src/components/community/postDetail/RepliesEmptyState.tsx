'use client'

import { communityPageTexts } from '@/constants/componentTexts/community'

export const RepliesEmptyState = () => (
    <div className={'rounded-md bg-muted/50 border border-border p-6 text-center text-muted-foreground'}>
        <p>
            {communityPageTexts.postDetail.noReplies}
        </p>
    </div>
)
