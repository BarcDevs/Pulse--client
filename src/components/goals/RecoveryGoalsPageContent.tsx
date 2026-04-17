import { RecoveryGoalsData } from '@/types/goals'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'

import { MainProgressCard } from './MainProgressCard'
import { MilestonesSection } from './MilestonesSection'
import { RecoveryGoalsHeader } from './RecoveryGoalsHeader'
import { StatSummaryCard } from './StatSummaryCard'

type RecoveryGoalsPageContentProps = {
    data: RecoveryGoalsData
}

export const RecoveryGoalsPageContent = ({
    data
}: RecoveryGoalsPageContentProps) => (
    <div className={'p-8 md:p-12 max-w-7xl mx-auto w-full'}>
        <RecoveryGoalsHeader
            description={recoveryGoalsPageTexts.header.description}
        />

        <div className={'grid grid-cols-1 md:grid-cols-12 gap-6 mt-8'}>
            <MainProgressCard data={data.mainGoal}/>

            <StatSummaryCard data={data.statSummary}/>

            <MilestonesSection milestones={data.milestones}/>
        </div>
    </div>
)
