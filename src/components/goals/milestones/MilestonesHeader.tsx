import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'

import { SectionHeader } from '../SectionHeader'

type MilestonesHeaderProps = {
    onViewAll?: () => void
}

export const MilestonesHeader = ({
    onViewAll
}: MilestonesHeaderProps) => (
    <div className={'flex items-center justify-between mb-6'}>
        <SectionHeader
            title={recoveryGoalsPageTexts.milestones
                .title}
            subtitle={recoveryGoalsPageTexts.milestones
                .subtitle}
        />

        <Button
            variant={'ghost'}
            onClick={onViewAll}
            className={'text-white/70 hover:text-white'}
        >
            {recoveryGoalsPageTexts.milestones
                .viewAll}

            <ChevronRight className={'ml-2 h-4 w-4'} />
        </Button>
    </div>
)
