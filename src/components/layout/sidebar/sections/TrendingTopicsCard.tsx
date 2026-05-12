'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { useForumTags } from '@/hooks/queries/useForumTags'

import { cn } from '@/lib/utils'

const MAX_TRENDING_TOPICS = 5

type TrendingTopicsCardProps = {
    selectedTag: string | null
    onTagSelect: (tag: string | null) => void
}

export const TrendingTopicsCard = ({
    selectedTag,
    onTagSelect
}: TrendingTopicsCardProps) => {
    const t = useTranslations()
    const {
        data: tagsData,
        isLoading,
        isError
    } = useForumTags()
    const topicsList = (
        tagsData ?? []
    ).slice(0, MAX_TRENDING_TOPICS)
    const isEmpty = (
        isLoading && topicsList.length === 0
    )

    return (
        <div className={'rounded-2xl bg-surface-card p-5'}>
            <h3 className={'mb-4 font-semibold text-foreground'}>
                {t('community.trending.title')}
            </h3>
            {isEmpty ? (
                <div className={'text-sm text-muted-foreground'}>
                    {t('community.trending.loading')}
                </div>
            ) : isError ? (
                <div className={'text-sm text-muted-foreground'}>
                    Failed to load topics
                </div>
            ) : (
                <div className={'flex--wrap gap-2'}>
                    {topicsList.map((topic) => (
                        <Button
                            key={topic.id}
                            onClick={() => onTagSelect(
                                selectedTag === topic.name
                                    ? null
                                    : topic.name
                            )}
                            variant={'ghost'}
                            size={'sm'}
                            className={cn(
                                'rounded-full text-sm transition-colors',
                                selectedTag === topic.name
                                    ? 'bg-primary text-white'
                                    : 'bg-surface-section text-muted-foreground hover:bg-primary hover:text-white'
                            )}
                        >
                            {topic.name}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    )
}