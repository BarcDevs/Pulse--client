'use client'

import { useTranslations } from 'next-intl'

import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
            <div className={'relative flex-1'}>
                <Search
                    size={16}
                    className={'absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'}
                />
                <Input
                    value={searchValue}
                    className={'pl-9 bg-surface-card'}
                    placeholder={t(communityLocales.posts.searchPlaceholder)}
                    onChange={e => onSearchAction(e.target.value)}
                />
            </div>
            {!isPostOpen && (
                <Button onClick={onNewPostAction}>
                    {t(communityLocales.posts.newPostButton)}
                </Button>
            )}
        </div>
    )
}
