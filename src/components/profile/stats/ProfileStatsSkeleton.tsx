import { Skeleton } from '@/components/ui/skeleton'

export const ProfileStatsSkeleton = () => (
    <div className={'mt-6 grid w-full grid-cols-3 gap-4 border-t border-border pt-6'}>
        {[0, 1, 2].map((n) => (
            <div key={n} className={'flex flex-col items-center gap-1.5'}>
                <Skeleton className={'h-7 w-10'}/>
                <Skeleton className={'h-3 w-16'}/>
            </div>
        ))}
    </div>
)
