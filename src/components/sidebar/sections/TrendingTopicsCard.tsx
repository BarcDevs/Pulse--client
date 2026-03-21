'use client'

import * as communityTexts from '@/constants/communityTexts'

const trendingTopics = communityTexts.COMMUNITY_TRENDING_TOPICS

export const TrendingTopicsCard = () => (
    <div className={'rounded-2xl bg-surface-card p-5'}>
        <h3 className={'mb-4 font-semibold text-foreground'}>
            {communityTexts.COMMUNITY_TRENDING_TOPICS_TITLE}
        </h3>
        <div className={'flex flex-wrap gap-2'}>
            {trendingTopics.map((topic) => (
                <button
                    key={topic}
                    className={'rounded-full bg-surface-section px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary'}
                >
                    {topic}
                </button>
            ))}
        </div>
    </div>
)