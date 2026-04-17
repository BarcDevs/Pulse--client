import { StatSummaryCard as StatSummaryCardType } from '@/types/goals'

import { CategoryStatRow } from './CategoryStatRow'

type StatSummaryCardProps = {
    data: StatSummaryCardType
}

export const StatSummaryCard = ({
    data
}: StatSummaryCardProps) => (
    <div className={'md:col-span-4 bg-primary-gradient-start text-white rounded-xl p-8'}>
        <div className={'flex flex-col gap-4'}>
            <div>
                <h2 className={'text-xl font-bold'}>
                    {data.title}
                </h2>

                <p className={'text-sm text-white/70 mt-1'}>
                    {data.description}
                </p>
            </div>

            <div className={'flex flex-col gap-1'}>
                {data.categories.map((category) => (
                    <CategoryStatRow
                        key={category.label}
                        label={category.label}
                        percentage={category.percentage}
                    />
                ))}
            </div>
        </div>
    </div>
)
