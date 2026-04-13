import { MentorsCard } from '@/components/layout/sidebar/sections/MentorsCard'
import { SanctuaryCard } from '@/components/layout/sidebar/sections/SanctuaryCard'
import { TrendingTopicsCard } from '@/components/layout/sidebar/sections/TrendingTopicsCard'

type CommunityPanelProps = {
    selectedTag: string | null
    onTagSelect: (tag: string | null) => void
}

export const CommunityPanel = ({
    selectedTag,
    onTagSelect
}: CommunityPanelProps) => (
    <div className={'space-y-6'}>
        <MentorsCard/>
        <SanctuaryCard/>
        <TrendingTopicsCard
            selectedTag={selectedTag}
            onTagSelect={onTagSelect}
        />
    </div>
)
