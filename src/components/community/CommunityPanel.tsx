'use client'

import { GuidelinesCard } from '@/components/layout/sidebar/sections/GuidelinesCard'
import { MentorsCard } from '@/components/layout/sidebar/sections/MentorsCard'
import { TrendingTopicsCard } from '@/components/layout/sidebar/sections/TrendingTopicsCard'
import { StickySidebar } from '@/components/shared/StickySidebar'

import { FEATURES } from '@/config/features'

import { useCommunityTag } from '@/context/CommunityTagContext'

export const CommunityPanel = () => {
    const {
        selectedTag,
        setSelectedTag
    } = useCommunityTag()

    return (
        <StickySidebar className={'side-column space-y-6 max-lg:static max-lg:w-full lg:below-header'}>
            {FEATURES.mentors && <MentorsCard/>}
            <GuidelinesCard/>
            <TrendingTopicsCard
                selectedTag={selectedTag}
                onTagSelectAction={setSelectedTag}
            />
        </StickySidebar>
    )
}
