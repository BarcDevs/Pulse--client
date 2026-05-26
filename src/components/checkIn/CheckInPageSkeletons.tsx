import { Skeleton } from '@/components/ui/skeleton'

const CheckInQuoteSkeleton = () => (
    <div className={'mt-10 rounded-2xl bg-primary-light p-8 flex flex-col items-center gap-4'}>
        <Skeleton className={'h-8 w-8 rounded-full'}/>
        <div className={'space-y-2 w-full max-w-md'}>
            <Skeleton className={'h-4 w-full'}/>
            <Skeleton className={'h-4 w-3/4 mx-auto'}/>
        </div>
    </div>
)

const SliderCardSkeleton = () => (
    <div className={'rounded-xl shadow-sm p-6 bg-card space-y-4'}>
        <div className={'flex items-center justify-between'}>
            <div className={'flex items-center gap-3'}>
                <Skeleton className={'h-10 w-10 rounded-full'}/>
                <Skeleton className={'h-5 w-24'}/>
            </div>
            <Skeleton className={'h-8 w-12 rounded-md'}/>
        </div>
        <Skeleton className={'h-2 w-full rounded-full'}/>
        <div className={'flex justify-between'}>
            <Skeleton className={'h-3 w-12'}/>
            <Skeleton className={'h-3 w-12'}/>
        </div>
    </div>
)

export const CheckInPageSkeletons = () => (
    <div className={'space-y-6 p-6'}>
        <CheckInQuoteSkeleton/>
        <div className={'space-y-6'}>
            <div className={'grid gap-4 sm:grid-cols-2'}>
                <SliderCardSkeleton/>
                <SliderCardSkeleton/>
            </div>
            <Skeleton className={'h-32 w-full rounded-xl'}/>
            <div className={'space-y-3'}>
                <Skeleton className={'h-5 w-32'}/>
                <div className={'flex flex-wrap gap-2'}>
                    {[0, 1, 2, 3].map((n) => (
                        <Skeleton
                            key={n}
                            className={'h-9 w-24 rounded-full'}
                        />
                    ))}
                </div>
            </div>
            <div className={'flex justify-center pt-4'}>
                <Skeleton className={'h-11 w-36 rounded-md'}/>
            </div>
        </div>
    </div>
)
