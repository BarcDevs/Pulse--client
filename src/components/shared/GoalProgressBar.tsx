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
}: GoalProgressBarProps) => (
    <div>
        <div className={
            variant === 'white'
                ? 'flex items-center justify-between text-sm'
                : 'flex items-center justify-between mb-2'
        }
        >
            <span className={
                variant === 'white'
                    ? 'text-xs font-medium uppercase tracking-wider text-white/80'
                    : 'text-sm'
            }
            >
                {label}
            </span>
            <span className={
                variant === 'white'
                    ? 'font-medium'
                    : 'text-sm font-medium'
            }
            >
                {progress}%
            </span>
        </div>
        {variant === 'white'
            ? (
                <Progress
                    value={progress}
                    className={'mt-2 h-2 bg-white/20 *:data-[slot=progress-indicator]:bg-white'}
                />
            )
            : (
                <div className={'h-2 bg-white/20 rounded-full overflow-hidden'}>
                    <div
                        className={'h-full bg-white rounded-full transition-all'}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )
        }
    </div>
)
