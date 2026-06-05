import { Flag } from 'lucide-react'

type MilestonesNextUpProps = {
    nextUpLabel: string
    nextMilestone?: string
}

export const MilestonesNextUp = ({
    nextUpLabel,
    nextMilestone
}: MilestonesNextUpProps) => (
    <div className={'pt-3 border-t border-border flex-center-between'}>
        <div className={'flex items-center gap-1.5 text-muted-foreground'}>
            <Flag className={'h-4 w-4'}/>
            <span className={'text-sm'}>
                {nextUpLabel}
            </span>
        </div>
        {nextMilestone && (
            <span className={'text-sm font-bold text-foreground'}>
                {nextMilestone}
            </span>
        )}
    </div>
)
