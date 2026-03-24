import {Progress} from '@/components/ui/progress'

type GoalProgressBarProps = {
    label: string
    progress: number
    variant?: 'default' | 'white'
}

export const GoalProgressBar = ({
    label,
    progress,
    variant = 'default'
}: GoalProgressBarProps) => {
    // todo: merge into one conditional component
    if (variant === 'white') {
        return (
            <div>
                <div className={'flex items-center justify-between text-sm'}>
                    <span className={'text-xs font-medium uppercase tracking-wider text-white/80'}>
                        {label}
                    </span>
                    <span className={'font-medium'}>
                        {progress}%
                    </span>
                </div>
                <Progress
                    value={progress}
                    className={'mt-2 h-2 bg-white/20 *:data-[slot=progress-indicator]:bg-white'}
                />
            </div>
        )
    }

    return (
        <div>
            <div className={'flex items-center justify-between mb-2'}>
                <span className={'text-sm'}>
                    {label}
                </span>
                <span className={'text-sm font-medium'}>
                    {progress}%
                </span>
            </div>
            <div className={'h-2 bg-white/20 rounded-full overflow-hidden'}>
                <div
                    className={'h-full bg-white rounded-full transition-all'}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    )
}
