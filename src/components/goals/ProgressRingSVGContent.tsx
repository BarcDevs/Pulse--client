type ProgressRingSVGContentProps = {
    circumference: number
    offset: number
    radius: number
}

export const ProgressRingSVGContent = ({
    circumference,
    offset,
    radius
}: ProgressRingSVGContentProps) => (
    <svg
        className={'w-full h-full transform -rotate-90'}
        viewBox={'0 0 128 128'}
    >
        <circle
            cx={64}
            cy={64}
            r={radius}
            fill={'transparent'}
            stroke={'currentColor'}
            strokeWidth={8}
            className={'text-surface-container-high'}
        />
        <circle
            cx={64}
            cy={64}
            r={radius}
            fill={'transparent'}
            stroke={'currentColor'}
            strokeWidth={8}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap={'round'}
            className={'text-primary transition-all duration-500'}
        />
    </svg>
)
