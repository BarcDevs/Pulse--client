'use client'

import { EmptyState } from '@/components/shared/EmptyState'

import { communityPageTexts } from '@/constants/componentTexts/community'

export const RepliesEmptyState = () => (
    <div className={'rounded-md bg-muted/50 border border-border'}>
        <EmptyState
            message={communityPageTexts.postDetail.noReplies}
        />
    </div>
)
