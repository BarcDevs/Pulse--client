'use client'

import { useTranslations } from 'next-intl'

import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { communityLocales } from '@/locales/communityLocales'

type PostFormHeaderProps = {
    isReply: boolean
    onCancelAction?: () => void
}

export const PostFormHeader = ({
    isReply,
    onCancelAction
}: PostFormHeaderProps) => {
    const t = useTranslations()

    return (
        <div className={'flex items-start justify-between gap-4 mb-4'}>
            <h3 className={'text-sm font-semibold'}>
                {isReply
                    ? t(communityLocales.postForm.writeReply)
                    : t(communityLocales.postForm.createPost)}
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
}