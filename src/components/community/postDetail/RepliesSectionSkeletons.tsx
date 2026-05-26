import { Skeleton } from '@/components/ui/skeleton'

export const RepliesSectionSkeletons = () => (
    <div className={'space-y-3'}>
        {[0, 1, 2].map((n) => (
            <div
                key={n}
                className={'flex gap-3 p-4 rounded-lg border border-border bg-secondary-50 border-l-4 border-l-primary'}
            >
                <Skeleton className={'h-9 w-9 rounded-full shrink-0'}/>
                <div className={'flex-1 space-y-2'}>
                    <div className={'flex gap-2'}>
                        <Skeleton className={'h-4 w-24'}/>
                        <Skeleton className={'h-3 w-16'}/>
                    </div>
                    <Skeleton className={'h-4 w-full'}/>
                    <Skeleton className={'h-4 w-3/4'}/>
                </div>
            </div>
        ))}
    </div>
)
