'use client'

import { MentorsCard } from './MentorsCard'
import { SanctuaryCard } from './SanctuaryCard'
import { TrendingTopicsCard } from './TrendingTopicsCard'

export const CommunitySection = () => (
    <div className={'space-y-6'}>
        <MentorsCard />
        <SanctuaryCard />
        <TrendingTopicsCard />
    </div>
)