import {MentorsCard} from '@/components/layout/sidebar/sections/MentorsCard'
import {SanctuaryCard} from '@/components/layout/sidebar/sections/SanctuaryCard'
import {TrendingTopicsCard} from '@/components/layout/sidebar/sections/TrendingTopicsCard'

export const CommunityPanel = () => (
    <div className={'space-y-6'}>
        <MentorsCard />
        <SanctuaryCard />
        <TrendingTopicsCard />
    </div>
)
