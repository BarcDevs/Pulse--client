import { Trophy } from 'lucide-react'

import { INSIGHTS_MILESTONE_MOCK } from '@/mocks/insightsMockData'

export const MilestoneCard = () => (
    <div className={'rounded-2xl bg-linear-to-br from-purple to-purple/80 p-6 text-purple-foreground h-full'}>
        <div className={'flex items-center justify-between'}>
            <Trophy className={'h-8 w-8 text-purple-foreground/80'}/>
        </div>

        <h3 className={'mt-4 text-xl font-semibold'}>
            {INSIGHTS_MILESTONE_MOCK.title}
        </h3>

        <p className={'mt-2 text-accent-foreground/80 text-sm leading-relaxed'}>
            {INSIGHTS_MILESTONE_MOCK.description}
        </p>

        <div className={'mt-4 inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5 text-xs font-medium'}>
            {INSIGHTS_MILESTONE_MOCK.label}
        </div>
    </div>
)
