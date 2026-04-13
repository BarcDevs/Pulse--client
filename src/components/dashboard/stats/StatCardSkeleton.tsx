import {
    Card,
    CardContent
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const StatCardSkeleton = () => (
    <Card className={'border-0 shadow-sm'}>
        <CardContent className={'pt-6'}>
            <div className={'flex items-center gap-4'}>
                <Skeleton className={'size-12 shrink-0 rounded-xl'}/>
                <div className={'flex-1'}>
                    <Skeleton className={'h-3 w-12 mb-2'}/>
                    <Skeleton className={'h-7 w-20 mb-1'}/>
                    <Skeleton className={'h-4 w-16'}/>
                </div>
            </div>
        </CardContent>
    </Card>
)
