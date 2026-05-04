'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { communityLocales } from '@/locales/communityLocales'

type PostFormActionsProps = {
    isReply: boolean
    onCancelAction?: () => void
    isLoading: boolean
}

export const PostFormActions = ({
    isReply,
    onCancelAction,
    isLoading
}: PostFormActionsProps) => {
    const t = useTranslations()

    return (
        <div className={'flex gap-2 justify-end'}>
            {onCancelAction && (
                <Button
                    variant={'outline'}
                    type={'button'}
                    onClick={onCancelAction}
                >
                    {t(communityLocales.postForm.cancel)}
                </Button>
            )}
            <Button
                type={'submit'}
                disabled={isLoading}
            >
                {isReply
                    ? t(communityLocales.postForm.sendReply)
                    : t(communityLocales.postForm.createPost)}
            </Button>
        </div>
    )
}