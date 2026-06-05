import { Skeleton } from '@/components/ui/skeleton'

import { RepliesSectionSkeletons } from './RepliesSectionSkeletons'

const PostDetailCardSkeleton = () => (
    <div className={'rounded-2xl bg-surface-card shadow-sm overflow-hidden'}>
        <div className={'p-7 space-y-4'}>
            <div className={'flex items-center gap-2 mb-2'}>
                <Skeleton className={'h-5 w-20 rounded-full'}/>
                <Skeleton className={'h-4 w-40'}/>
            </div>
            <Skeleton className={'h-8 w-3/4'}/>
            <div className={'space-y-2'}>
                <Skeleton className={'h-4 w-full'}/>
                <Skeleton className={'h-4 w-full'}/>
                <Skeleton className={'h-4 w-2/3'}/>
            </div>
        </div>
        <div className={'p-4 border-t border-border flex gap-3'}>
            <Skeleton className={'h-9 w-20 rounded-md'}/>
            <Skeleton className={'h-9 w-24 rounded-md'}/>
        </div>
    </div>
)

export const PostDetailSkeletons = () => (
    <div className={'space-y-6'}>
        <Skeleton className={'h-4 w-32'}/>
        <PostDetailCardSkeleton/>
        <div className={'rounded-2xl bg-surface-card shadow-sm p-6 space-y-4'}>
            <Skeleton className={'h-6 w-28'}/>
            <RepliesSectionSkeletons/>
        </div>
    </div>
)
