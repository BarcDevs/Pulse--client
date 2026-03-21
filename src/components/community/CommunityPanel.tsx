import {MentorsCard} from '@/components/sidebar/sections/MentorsCard'
import {SanctuaryCard} from '@/components/sidebar/sections/SanctuaryCard'
import {TrendingTopicsCard} from '@/components/sidebar/sections/TrendingTopicsCard'

const CommunityPanel = () => (
    <div className={'space-y-6'}>
        <MentorsCard />
        <SanctuaryCard />
        <TrendingTopicsCard />
    </div>
)

export {CommunityPanel}
