import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'

const RADIUS = 88
const CX = 96
const CY = 96
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

type GoalProgressRingProps = {
    percentage: number
}

export const GoalProgressRing = ({
    percentage
}: GoalProgressRingProps) => {
    const offset = CIRCUMFERENCE
        - (percentage / 100) * CIRCUMFERENCE

    return (
        <div className={'flex flex-col items-center'}>
            <svg
                width={192}
                height={192}
                viewBox={'0 0 192 192'}
                className={'drop-shadow-lg'}
            >
                <defs>
                    <linearGradient
                        id={'progressGradient'}
                        x1={'0%'}
                        y1={'0%'}
                        x2={'100%'}
                        y2={'100%'}
                    >
                        <stop
                            offset={'0%'}
                            stopColor={'var(--primary-gradient-start)'}
                        />
                        <stop
                            offset={'100%'}
                            stopColor={'var(--primary-gradient-end)'}
                        />
                    </linearGradient>
                </defs>

                <circle
                    cx={CX}
                    cy={CY}
                    r={RADIUS}
                    fill={'none'}
                    stroke={'rgba(0, 0, 0, 0.1)'}
                    strokeWidth={8}
                />

                <circle
                    cx={CX}
                    cy={CY}
                    r={RADIUS}
                    fill={'none'}
                    stroke={'url(#progressGradient)'}
                    strokeWidth={8}
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={offset}
                    strokeLinecap={'round'}
                    transform={`rotate(-90 ${CX} ${CY})`}
                />

                <text
                    x={CX}
                    y={CY}
                    textAnchor={'middle'}
                    dominantBaseline={'middle'}
                    className={'text-4xl font-bold fill-slate-900'}
                >
                    {percentage}%
                </text>
            </svg>

            <p className={'mt-4 text-sm text-foreground/60 font-medium'}>
                {recoveryGoalsPageTexts.mainCard.overall}
            </p>
        </div>
    )
}
