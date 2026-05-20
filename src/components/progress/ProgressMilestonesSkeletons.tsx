type ProgressMilestonesSkeletonsProps = {
    count: number
}

const ProgressGoalCardSkeleton = () => (
    <div className={'flex animate-pulse flex-col gap-3 rounded-xl bg-surface-section p-5'}>
        <div className={'h-5 w-20 rounded-full bg-muted'}/>
        <div className={'h-4 w-full rounded bg-muted'}/>
        <div className={'h-4 w-3/4 rounded bg-muted'}/>
        <div className={'mt-auto space-y-1.5'}>
            <div className={'flex justify-between'}>
                <div className={'h-3 w-16 rounded bg-muted'}/>
                <div className={'h-3 w-8 rounded bg-muted'}/>
            </div>
            <div className={'h-1.5 rounded-full bg-muted'}/>
        </div>
    </div>
)

export const ProgressMilestonesSkeletons = ({
    count = 4
}: ProgressMilestonesSkeletonsProps) => (
    <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
        {Array.from({ length: count }, (_, i) => (
            <ProgressGoalCardSkeleton key={i}/>
        ))}
    </div>
)
