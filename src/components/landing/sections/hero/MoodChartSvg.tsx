const CHART_POINTS: [number, number][] = [[0,62],[36,60],[72,52],[108,44],[144,36],[180,28],[216,26],[240,14]]
const CHART_PATH = 'M0 62 L18 56 L36 60 L54 48 L72 52 L90 38 L108 44 L126 30 L144 36 L162 24 L180 28 L198 20 L216 26 L234 16 L240 14'
const FILL_PATH = `${CHART_PATH} L240 88 L0 88 Z`

export const MoodChartSvg = () => (
    <svg
        viewBox={'0 0 240 88'}
        className={'block h-22 w-full'}
        preserveAspectRatio={'none'}
    >
        <defs>
            <linearGradient
                id={'moodFill'}
                x1={'0'}
                y1={'0'}
                x2={'0'}
                y2={'1'}
            >
                <stop
                    offset={'0%'}
                    stopColor={'var(--color-primary)'}
                    stopOpacity={'0.28'}
                />
                <stop
                    offset={'100%'}
                    stopColor={'var(--color-primary)'}
                    stopOpacity={'0'}
                />
            </linearGradient>
        </defs>
        {[18, 36, 54, 72].map(y => (
            <line
                key={y}
                x1={'0'}
                y1={y}
                x2={'240'}
                y2={y}
                stroke={'var(--color-border)'}
                strokeWidth={'1'}
                strokeDasharray={'2 4'}
            />
        ))}
        <path
            d={FILL_PATH}
            fill={'url(#moodFill)'}
        />
        <path
            d={CHART_PATH}
            fill={'none'}
            stroke={'var(--color-primary)'}
            strokeWidth={'2.5'}
            strokeLinecap={'round'}
            strokeLinejoin={'round'}
        />
        {CHART_POINTS.map(([x, y], i) => (
            <circle
                key={i}
                cx={x}
                cy={y}
                r={i === 7 ? 4 : 2.5}
                fill={'var(--color-surface-card)'}
                stroke={'var(--color-primary)'}
                strokeWidth={i === 7 ? 2.5 : 1.5}
            />
        ))}
    </svg>
)
