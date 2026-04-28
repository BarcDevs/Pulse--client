import { Skeleton } from '@/components/ui/skeleton'

export const RecoveryGoalsSkeletons = () => (
    <div className={'grid grid-cols-1 lg:grid-cols-12 gap-8'}>
        <div className={'lg:col-span-8 space-y-6'}>
            {[...Array(2)].map((_, i) => (
                <Skeleton
                    key={i}
                    className={'h-64 rounded-xl'}
                />
            ))}
        </div>
        <Skeleton className={'lg:col-span-4 h-64 rounded-xl'}/>
    </div>
)
