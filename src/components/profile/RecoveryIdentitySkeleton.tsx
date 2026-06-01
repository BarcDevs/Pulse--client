import { Skeleton } from '@/components/ui/skeleton'

export const RecoveryIdentitySkeleton = () => (
    <div className={'flex flex-wrap gap-3'}>
        {[100, 130, 90, 115].map((w) => (
            <Skeleton
                key={w}
                className={'h-9 rounded-full'}
                style={{ width: w }}
            />
        ))}
    </div>
)
