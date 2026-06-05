import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const ProfileCardSkeleton = () => (
    <Card className={'border-0 shadow-sm'}>
        <CardContent className={'flex flex-col items-center pt-8 text-center'}>
            <Skeleton className={'size-24 rounded-full'}/>
            <Skeleton className={'mt-4 h-6 w-32'}/>
            <Skeleton className={'mt-2 h-4 w-24'}/>
            <div className={'mt-6 grid w-full grid-cols-3 gap-4 border-t border-border pt-6'}>
                {[0, 1, 2].map((n) => (
                    <div key={n} className={'flex flex-col items-center gap-1.5'}>
                        <Skeleton className={'h-7 w-10'}/>
                        <Skeleton className={'h-3 w-16'}/>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)
