import { Skeleton } from '@/components/ui/skeleton'

export const BasicInfoSkeleton = () => (
    <div className={'grid gap-6 sm:grid-cols-2'}>
        {[0, 1, 2, 3, 4, 5].map((n) => (
            <div key={n} className={'space-y-2'}>
                <Skeleton className={'h-3 w-24'}/>
                <Skeleton className={'h-5 w-40'}/>
            </div>
        ))}
    </div>
)
