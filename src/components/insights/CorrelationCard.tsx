import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts'

import * as InsightsDetailTexts from '@/constants/insightsDetailTexts'

import {PATTERNS_SOCIAL_DATA} from '@/mocks/chartData'

export const CorrelationCard = () => (
    <div className={'rounded-xl bg-surface-section p-4'}>
        <p className={'text-xs font-medium uppercase tracking-wider text-muted-foreground'}>
            {InsightsDetailTexts.INSIGHTS_PATTERNS_CORRELATION_LABEL}
        </p>
        <h4 className={'mt-1 font-semibold text-foreground'}>
            {InsightsDetailTexts.INSIGHTS_PATTERNS_CORRELATION_TITLE}
        </h4>
        <p className={'mt-2 text-sm text-muted-foreground'}>
            {InsightsDetailTexts.INSIGHTS_PATTERNS_CORRELATION_DESCRIPTION}
        </p>
        <div className={'mt-4 h-24'}>
            <ResponsiveContainer
                width={'100%'}
                height={'100%'}
            >
                <BarChart data={PATTERNS_SOCIAL_DATA}>
                    <XAxis dataKey={'day'} hide/>
                    <YAxis hide/>
                    <Bar
                        dataKey={'value'}
                        fill={'var(--primary)'}
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
)