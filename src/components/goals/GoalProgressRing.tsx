type GoalProgressRingProps = {
    percentage: number
    size?: number
    strokeWidth?: number
}

export const GoalProgressRing = ({
    percentage,
    size = 96,
    strokeWidth = 8
}: GoalProgressRingProps) => {
    const r = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * r
    const offset = circumference * (1 - percentage / 100)

    return (
        <svg
            width={size}
            height={size}
            style={{ transform: 'rotate(-90deg)' }}
        >
            <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill={'none'}
                stroke={'currentColor'}
                strokeWidth={strokeWidth}
                className={'text-border'}
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill={'none'}
                stroke={'currentColor'}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap={'round'}
                className={'text-primary'}
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
        </svg>
    )
}