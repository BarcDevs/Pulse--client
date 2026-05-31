import { Progress as ProgressPrimitive } from 'radix-ui'

import { MilestoneLegendItem } from './MilestoneLegendItem'

type MilestonesProgressProps = {
    completionRate: number
    indicatorWidth: string
    inProgressWidth: string
    acrossGoalsLabel: string
    percentCompleteLabel: string
    completedCountLabel: string
    inProgressCountLabel: string
    upcomingCountLabel: string
}

export const MilestonesProgress = ({
    completionRate,
    indicatorWidth,
    inProgressWidth,
    acrossGoalsLabel,
    percentCompleteLabel,
    completedCountLabel,
    inProgressCountLabel,
    upcomingCountLabel
}: MilestonesProgressProps) => (
    <>
        <div className={'flex-center-between mb-2'}>
            <p className={'text-xs font-semibold text-muted-foreground label-uppercase'}>
                {acrossGoalsLabel}
            </p>
            <p className={'text-xs text-muted-foreground'}>
                {percentCompleteLabel}
            </p>
        </div>

        <ProgressPrimitive.Root
            className={'relative h-2 w-full overflow-hidden rounded-full bg-border mb-3'}
            value={completionRate * 100}
            max={100}
        >
            <ProgressPrimitive.Indicator
                className={'absolute top-0 h-full bg-insight transition-all'}
                style={{
                    insetInlineStart: 0,
                    width: indicatorWidth
                }}
            />
            <ProgressPrimitive.Indicator
                className={'absolute top-0 h-full bg-milestone-inprogress transition-all'}
                style={{
                    insetInlineStart: indicatorWidth,
                    width: inProgressWidth
                }}
            />
        </ProgressPrimitive.Root>

        <div className={'flex items-center gap-4 mb-3'}>
            <MilestoneLegendItem
                dotClass={'bg-insight'}
                label={completedCountLabel}
            />
            <MilestoneLegendItem
                dotClass={'bg-milestone-inprogress'}
                label={inProgressCountLabel}
            />
            <MilestoneLegendItem
                dotClass={'bg-border'}
                label={upcomingCountLabel}
            />
        </div>
    </>
)
