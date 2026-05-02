import { StatSummaryCardData } from '@/types/goals'

import { GoalStatRow } from '../GoalStatRow'
import { SectionHeader } from '../SectionHeader'

type StatSummaryCardProps = {
    data: StatSummaryCardData
}

export const StatSummaryCard = ({
    data
}: StatSummaryCardProps) => (
    <div className={'md:col-span-4 bg-primary-gradient-start text-white rounded-xl p-8'}>
        <div className={'flex flex-col gap-4'}>
            <SectionHeader
                title={data.title}
                subtitle={data.description}
                titleClassName={'text-xl font-bold'}
                subtitleClassName={'text-sm text-white/70 mt-1'}
            />

            <div className={'flex flex-col gap-1'}>
                {data.goal.map((goalStat) => (
                    <GoalStatRow
                        key={goalStat.label}
                        label={goalStat.label}
                        percentage={goalStat.percentage}
                    />
                ))}
            </div>
        </div>
    </div>
)
