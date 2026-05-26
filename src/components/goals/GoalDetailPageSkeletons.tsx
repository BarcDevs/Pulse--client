import { Skeleton } from '@/components/ui/skeleton'

import { MilestonesSectionSkeletons }
    from './milestones/MilestonesSectionSkeletons'

export const GoalDetailPageSkeletons = () => (
    <div className={'p-8 md:p-12 max-w-6xl mx-auto w-full'}>
        <section className={'mb-12'}>
            <div className={'flex flex-col md:flex-row justify-between gap-8 mb-8'}>
                <div className={'flex-1 space-y-4'}>
                    <Skeleton className={'h-12 w-3/4'}/>
                    <Skeleton className={'h-5 w-full max-w-lg'}/>
                    <Skeleton className={'h-5 w-2/3 max-w-md'}/>
                    <Skeleton className={'h-4 w-48'}/>
                </div>
                <div className={'flex flex-col items-end gap-4'}>
                    <Skeleton className={'h-9 w-36 rounded-md'}/>
                    <div className={'border border-outline/20 shadow-sm p-6 rounded-xl flex flex-col items-center gap-3 shrink-0'}>
                        <Skeleton className={'w-24 h-24 rounded-full'}/>
                        <Skeleton className={'h-3 w-28'}/>
                    </div>
                </div>
            </div>
        </section>
        <MilestonesSectionSkeletons/>
    </div>
)
