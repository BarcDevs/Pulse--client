import { Skeleton } from '@/components/ui/skeleton'

const PostItemSkeleton = () => (
    <div className={'p-6'}>
        <div className={'flex items-start justify-between gap-4 mb-2'}>
            <div className={'flex items-center gap-2 mb-2'}>
                <Skeleton className={'h-5 w-20 rounded-full'}/>
                <Skeleton className={'h-4 w-36'}/>
            </div>
            <Skeleton className={'h-4 w-12 shrink-0'}/>
        </div>
        <Skeleton className={'h-5 w-2/3 mb-2'}/>
        <div className={'space-y-1.5 mb-3'}>
            <Skeleton className={'h-4 w-full'}/>
            <Skeleton className={'h-4 w-4/5'}/>
        </div>
        <div className={'flex gap-3'}>
            <Skeleton className={'h-7 w-16 rounded-md'}/>
            <Skeleton className={'h-7 w-20 rounded-md'}/>
        </div>
    </div>
)

type PostListSkeletonsProps = {
    count?: number
}

export const PostListSkeletons = ({
    count = 5
}: PostListSkeletonsProps) => (
    <div className={'divide-y divide-border'}>
        {Array.from({ length: count }, (_, i) => (
            <PostItemSkeleton key={`post-${i}`}/>
        ))}
    </div>
)
