'use client'

import { useTranslations } from 'next-intl'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useUser } from '@/hooks/ui/useUser'

import { communityLocales } from '@/locales/communityLocales'

type NewPostFloatingButtonProps = {
    isPostOpen: boolean
    onClickAction: () => void
}

export const NewPostFloatingButton = ({
    isPostOpen,
    onClickAction
}: NewPostFloatingButtonProps) => {
    const t = useTranslations()
    const { isAuthenticated } = useUser()

    if (isPostOpen || !isAuthenticated) {
        return null
    }

    return (
        <Button
            onClick={onClickAction}
            size={'icon'}
            aria-label={t(communityLocales.posts.newPostButton)}
            className={'fixed bottom-24 end-4 sm:hidden size-14 rounded-full shadow-lg shadow-blue-500/30 z-40'}
        >
            <Plus className={'size-6'}/>
        </Button>
    )
}
