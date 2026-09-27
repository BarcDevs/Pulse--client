'use client'

import { useTranslations } from 'next-intl'

import { X } from 'lucide-react'

import { IconButton } from '@/components/shared/buttons/IconButton'

import { appSettings } from '@/config/appSettings'

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
            <div>
                <h3 className={'text-base font-semibold'}>
                    {isReply ? t(communityLocales.postForm.writeReply) : t(communityLocales.postForm.createPost)}
                </h3>
                {!isReply && (
                    <p className={'text-xs text-muted-foreground mt-0.5'}>
                        {t(communityLocales.postForm.createPostSubtitle, {
                            brandName: appSettings.brandName
                        })}
                    </p>
                )}
            </div>
            {onCancelAction && (
                <IconButton
                    onClick={onCancelAction}
                    type={'button'}
                    size={'sm'}
                >
                    <X size={18}/>
                </IconButton>
            )}
        </div>
    )
}
