import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import { communityPageTexts } from '@/constants/componentTexts/community'

const trendingTopics = communityPageTexts.trending

type TrendingTopicsCardProps = {
    selectedTag: string | null
    onTagSelect: (tag: string | null) => void
}

export const TrendingTopicsCard = ({
    selectedTag,
    onTagSelect
}: TrendingTopicsCardProps) => (
    <div className={'rounded-2xl bg-surface-card p-5'}>
        <h3 className={'mb-4 font-semibold text-foreground'}>
            {communityPageTexts.trending.title}
        </h3>
        <div className={'flex flex-wrap gap-2'}>
            {trendingTopics.topics.map((topic) => (
                <Button
                    key={topic}
                    onClick={() => onTagSelect(
                        selectedTag === topic ? null : topic
                    )}
                    variant={'ghost'}
                    size={'sm'}
                    className={cn(
                        'rounded-full text-sm transition-colors',
                        selectedTag === topic
                            ? 'bg-primary text-white'
                            : 'bg-surface-section text-muted-foreground hover:bg-primary hover:text-white'
                    )}
                >
                    {`#${topic}`}
                </Button>
            ))}
        </div>
    </div>
)