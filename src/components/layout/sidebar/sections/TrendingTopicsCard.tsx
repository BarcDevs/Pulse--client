import { Button } from '@/components/ui/button'

import { communityPageTexts } from '@/constants/componentTexts/community'

const trendingTopics = communityPageTexts.trending

export const TrendingTopicsCard = () => (
    <div className={'rounded-2xl bg-surface-card p-5'}>
        <h3 className={'mb-4 font-semibold text-foreground'}>
            {communityPageTexts.trending.title}
        </h3>
        <div className={'flex flex-wrap gap-2'}>
            {trendingTopics.topics.map((topic) => (
                <Button
                    key={topic}
                    variant={'ghost'}
                    size={'sm'}
                    className={'rounded-full bg-surface-section text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary'}
                >
                    {topic}
                </Button>
            ))}
        </div>
    </div>
)