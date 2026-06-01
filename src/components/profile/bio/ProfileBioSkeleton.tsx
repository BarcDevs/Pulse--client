import { Skeleton } from '@/components/ui/skeleton'

export const ProfileBioSkeleton = () => (
    <div className={'space-y-2'}>
        <Skeleton className={'h-4 w-full'}/>
        <Skeleton className={'h-4 w-5/6'}/>
        <Skeleton className={'h-4 w-4/6'}/>
    </div>
)
