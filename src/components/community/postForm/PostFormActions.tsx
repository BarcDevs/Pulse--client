'use client'

import { Button } from '@/components/ui/button'

import { communityPageTexts } from '@/constants/componentTexts/community'

type PostFormActionsProps = {
    isReply: boolean
    onCancelAction?: () => void
    isLoading: boolean
}

export const PostFormActions = ({
    isReply,
    onCancelAction,
    isLoading
}: PostFormActionsProps) => (
    <div className={'flex gap-2 justify-end'}>
        {onCancelAction && (
            <Button
                variant={'outline'}
                type={'button'}
                onClick={onCancelAction}
            >
                {communityPageTexts.postForm.cancel}
            </Button>
        )}
        <Button
            type={'submit'}
            disabled={isLoading}
        >
            {isReply
                ? communityPageTexts.postForm.sendReply
                : communityPageTexts.postForm.createPost}
        </Button>
    </div>
)