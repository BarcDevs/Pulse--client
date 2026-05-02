import { Skeleton } from '@/components/ui/skeleton'

import { MilestonesSectionSkeletons }
    from './milestones/MilestonesSectionSkeletons'

export const GoalDetailPageSkeletons = () => (
    <div className={'p-8 md:p-12 max-w-6xl mx-auto w-full'}>
        <section className={'mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8'}>
            <div className={'flex-1 space-y-4'}>
                <Skeleton className={'h-12 w-3/4'}/>
                <Skeleton className={'h-5 w-full max-w-lg'}/>
                <Skeleton className={'h-5 w-2/3 max-w-md'}/>
            </div>
            <Skeleton className={'w-44 h-44 rounded-xl shrink-0'}/>
        </section>
        <MilestonesSectionSkeletons/>
    </div>
)