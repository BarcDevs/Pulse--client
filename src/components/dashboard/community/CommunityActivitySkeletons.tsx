import { Skeleton } from '@/components/ui/skeleton'

type Props = {
    count?: number
}

export const CommunityActivitySkeletons = ({
    count = 3
}: Props) => (
    <div className={'space-y-4'}>
        {Array.from({ length: count }).map((_, i) => (
            <div
                key={`community-activity-${i}`}
                className={'flex items-center gap-3'}
            >
                <Skeleton className={'size-8 shrink-0 rounded-full'}/>
                <div className={'flex-1'}>
                    <Skeleton className={'h-3 w-2/3 mb-1.5'}/>
                    <Skeleton className={'h-3 w-1/3'}/>
                </div>
            </div>
        ))}
    </div>
)
