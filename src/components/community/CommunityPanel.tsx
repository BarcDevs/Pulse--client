import { GuidelinesCard } from '@/components/layout/sidebar/sections/GuidelinesCard'
import { MentorsCard } from '@/components/layout/sidebar/sections/MentorsCard'
import { TrendingTopicsCard } from '@/components/layout/sidebar/sections/TrendingTopicsCard'

import { FEATURES } from '@/config/features'

type CommunityPanelProps = {
    selectedTag: string | null
    onTagSelect: (tag: string | null) => void
}

export const CommunityPanel = ({
    selectedTag,
    onTagSelect
}: CommunityPanelProps) => (
    <div className={'space-y-6'}>
        {FEATURES.mentors && <MentorsCard/>}
        <GuidelinesCard/>
        <TrendingTopicsCard
            selectedTag={selectedTag}
            onTagSelectAction={onTagSelect}
        />
    </div>
)
