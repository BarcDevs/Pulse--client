'use client'

import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { communityPageTexts } from '@/constants/componentTexts/community'

type PostFormHeaderProps = {
    isReply: boolean
    onCancelAction?: () => void
}

export const PostFormHeader = ({
    isReply,
    onCancelAction
}: PostFormHeaderProps) => (
    <div className={'flex items-start justify-between gap-4 mb-4'}>
        <h3 className={'text-sm font-semibold'}>
            {isReply
                ? communityPageTexts.postForm.writeReply
                : communityPageTexts.postForm.createPost}
        </h3>
        {onCancelAction && (
            <Button
                onClick={onCancelAction}
                type={'button'}
                variant={'ghost'}
                size={'sm'}
                className={'text-muted-foreground'}
            >
                <X size={18}/>
            </Button>
        )}
    </div>
)