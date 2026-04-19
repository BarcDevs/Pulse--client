import { Skeleton } from '@/components/ui/skeleton'

export const GoalFormPageSkeletons = () => (
    <>
        <Skeleton className={'h-8 w-32 mb-8'}/>
        <Skeleton className={'h-12 w-64 mb-4'}/>
        <Skeleton className={'h-6 w-full mb-12 max-w-2xl'}/>
        <div className={'grid grid-cols-1 lg:grid-cols-12 gap-8'}>
            <Skeleton className={'lg:col-span-8 h-96'}/>
            <Skeleton className={'lg:col-span-4 h-96'}/>
        </div>
    </>
)
