import { Skeleton } from '@/components/ui/skeleton'

export const GoalInsightsSectionSkeleton = () => (
    <div className={'bg-surface-card p-6 rounded-xl shadow-sm border border-border'}>
        <div className={'flex items-center gap-2 mb-4'}>
            <Skeleton className={'h-5 w-5 rounded-full'}/>
            <Skeleton className={'h-5 w-28'}/>
        </div>
        <div className={'space-y-4'}>
            <div className={'space-y-2 p-4 rounded-lg bg-muted/30'}>
                <Skeleton className={'h-4 w-3/4'}/>
                <Skeleton className={'h-3 w-full'}/>
            </div>
            <div className={'space-y-2 p-4 rounded-lg bg-muted/30'}>
                <Skeleton className={'h-4 w-2/3'}/>
                <Skeleton className={'h-3 w-full'}/>
            </div>
        </div>
    </div>
)
