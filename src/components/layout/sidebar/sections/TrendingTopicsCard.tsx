import { Button } from '@/components/ui/button'

import { useForumTags } from '@/hooks/queries/useForumTags'

import { cn } from '@/lib/utils'

import { communityPageTexts } from '@/constants/componentTexts/community'

const MAX_TRENDING_TOPICS = 5

type TrendingTopicsCardProps = {
    selectedTag: string | null
    onTagSelect: (tag: string | null) => void
}

export const TrendingTopicsCard = ({
    selectedTag,
    onTagSelect
}: TrendingTopicsCardProps) => {
    const { data: tagsData, isLoading } = useForumTags()
    const topicsList = (
        tagsData?.data ?? []
    ).slice(0, MAX_TRENDING_TOPICS)
    const isEmpty = (
        isLoading && topicsList.length === 0
    )

    return (
        <div className={'rounded-2xl bg-surface-card p-5'}>
            <h3 className={'mb-4 font-semibold text-foreground'}>
                {communityPageTexts.trending.title}
            </h3>
            {isEmpty ? (
                <div className={'text-sm text-muted-foreground'}>
                    {communityPageTexts.trending.loading}
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
                            {`#${topic.name}`}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    )
}