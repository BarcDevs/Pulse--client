import { Skeleton } from '@/components/ui/skeleton'

export const UserSkeleton = () => (
    <div className={'flex items-center gap-3 rounded-lg p-2'}>
        <Skeleton className={'size-9 rounded-full'}/>
    </div>
)