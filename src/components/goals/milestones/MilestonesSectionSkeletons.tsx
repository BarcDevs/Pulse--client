import { Skeleton } from '@/components/ui/skeleton'

export const MilestonesSectionSkeletons = () => (
    <div className={'space-y-4 relative'}>
        <div className={'absolute start-10 top-8 bottom-8 w-0.5 bg-surface-container-highest z-0'}/>
        <div className={'space-y-4'}>
            {[...Array(3)].map((_, i) => (
                <div
                    key={`skeleton-${i}`}
                    className={'relative z-10 flex items-start'}
                >
                    <Skeleton className={'w-20 h-20 rounded-full shrink-0'}/>
                    <div className={'ms-4 mt-2 flex-1 space-y-3'}>
                        <Skeleton className={'h-6 w-32'}/>
                        <Skeleton className={'h-5 w-48'}/>
                        <div className={'space-y-2'}>
                            <Skeleton className={'h-4 w-full'}/>
                            <Skeleton className={'h-4 w-3/4'}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)
