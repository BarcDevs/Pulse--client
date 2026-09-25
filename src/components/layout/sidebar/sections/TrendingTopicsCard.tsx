'use client'

import { useLocale, useTranslations } from 'next-intl'

import { ChipButton } from '@/components/shared/buttons/ChipButton'

import { useForumTags } from '@/hooks/queries/useForumTags'

import { getTagName } from '@/utils/tag'

import { TrendingTopicsSkeletons } from './TrendingTopicsSkeletons'

const MAX_TRENDING_TOPICS = 5

type TrendingTopicsCardProps = {
    selectedTag: string | null
    onTagSelectAction: (tag: string | null) => void
}

export const TrendingTopicsCard = ({
    selectedTag,
    onTagSelectAction
}: TrendingTopicsCardProps) => {
    const t = useTranslations()
    const locale = useLocale()
    const lang = locale.split('-')[0] as 'en' | 'he'
    const {
        data: tagsData,
        isLoading,
        isError
    } = useForumTags({
        filter: 'popular',
        limit: MAX_TRENDING_TOPICS
    })
    const topicsList = tagsData ?? []
    const isEmpty = isLoading && topicsList.length === 0

    return (
        <div className={'rounded-2xl bg-surface-card p-5'}>
            <h3 className={'mb-4 font-semibold text-foreground'}>
                {t('community.trending.title')}
            </h3>
            {isEmpty ? (
                <TrendingTopicsSkeletons/>
            ) : isError ? (
                <div className={'text-sm text-muted-foreground'}>
                    Failed to load topics
                </div>
            ) : (
                <div className={'flex flex-wrap gap-2'}>
                    {topicsList.map(topic => {
                        const isSelected = (
                            selectedTag === topic.slug
                        )
                        const onSelect = () => (
                            onTagSelectAction(
                                isSelected
                                    ? null
                                    : topic.slug
                            )
                        )
                        return (
                            <ChipButton
                                key={topic.id}
                                solid
                                size={'md'}
                                isSelected={isSelected}
                                onClick={onSelect}
                            >
                                {getTagName(topic, lang)}
                            </ChipButton>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
