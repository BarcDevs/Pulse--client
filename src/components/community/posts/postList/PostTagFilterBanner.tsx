'use client'

import { useLocale, useTranslations } from 'next-intl'

import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useForumTags } from '@/hooks/queries/useForumTags'

import { getTagName } from '@/utils/tag'

import { communityLocales } from '@/locales/communityLocales'

type PostTagFilterBannerProps = {
    tag: string
    onClear: () => void
}

export const PostTagFilterBanner = ({
    tag,
    onClear
}: PostTagFilterBannerProps) => {
    const t = useTranslations()
    const locale = useLocale()
    const lang = locale.split('-')[0] as 'en' | 'he'
    const { data: fullTags = [] } = useForumTags()
    const fullTag = fullTags.find(ft => ft.slug === tag)
    const displayName = fullTag
        ? getTagName(fullTag, lang)
        : tag

    return (
        <div className={'flex items-center gap-2 px-5 py-2.5 border-b border-border bg-surface-section/30'}>
            <span className={'text-xs font-semibold text-muted-foreground uppercase tracking-wide'}>
                {t(communityLocales.posts.tagFilter)}
            </span>
            <span className={'inline-flex items-center gap-1 pl-3 pr-1 py-1 rounded-full bg-primary-foreground text-primary border border-border text-sm font-semibold'}>
                {displayName}
                <Button
                    variant={'ghost'}
                    size={'icon'}
                    onClick={onClear}
                    aria-label={t(communityLocales.posts.clearTagFilter)}
                    className={'h-5 w-5 rounded-full p-0 hover:bg-primary/20 hover:text-primary'}
                >
                    <X className={'h-3 w-3'}/>
                </Button>
            </span>
        </div>
    )
}
