'use client'

import { useTranslations } from 'next-intl'

import { Plus } from 'lucide-react'

import { FabButton } from '@/components/shared/buttons/FabButton'

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
        <FabButton
            onClick={onClickAction}
            aria-label={t(communityLocales.posts.newPostButton)}
        >
            <Plus className={'size-6'}/>
        </FabButton>
    )
}
