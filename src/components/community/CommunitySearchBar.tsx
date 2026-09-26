'use client'

import { useTranslations } from 'next-intl'

import { Plus } from 'lucide-react'

import { Button } from '@/components/shared/buttons/Button'
import { SearchInput } from '@/components/shared/inputs/SearchInput'

import { communityLocales } from '@/locales/communityLocales'

type CommunitySearchBarProps = {
    searchValue: string
    onSearchAction: (value: string) => void
    onNewPostAction: () => void
    isPostOpen: boolean
}

export const CommunitySearchBar = ({
    searchValue,
    onSearchAction,
    onNewPostAction,
    isPostOpen
}: CommunitySearchBarProps) => {
    const t = useTranslations()

    return (
        <div className={'flex gap-3'}>
            <SearchInput
                value={searchValue}
                placeholder={t(communityLocales.posts.searchPlaceholder)}
                onChange={e => onSearchAction(e.target.value)}
                className={'flex-1'}
            />
            {!isPostOpen && (
                <Button
                    onClick={onNewPostAction}
                    className={'hidden sm:inline-flex gap-2'}
                >
                    <Plus className={'h-4 w-4'}/>
                    {t(communityLocales.posts.newPostButton)}
                </Button>
            )}
        </div>
    )
}
