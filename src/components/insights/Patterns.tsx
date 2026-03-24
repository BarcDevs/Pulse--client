'use client'

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts'

import {Badge} from '@/components/ui/badge'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Tabs,
    TabsList,
    TabsTrigger
} from '@/components/ui/tabs'

import * as InsightsDetailTexts from '@/constants/insightsDetailTexts'

import {PATTERNS_SOCIAL_DATA} from '@/mocks/chartData'

export const InsightsPatterns = () => (
    <Card className={'mt-6 border-0 shadow-sm'}>
        <CardHeader className={'flex flex-row items-center justify-between'}>
            <CardTitle className={'text-lg font-semibold'}>
                {InsightsDetailTexts.INSIGHTS_PATTERNS_TITLE}
            </CardTitle>
            <Tabs
                defaultValue={'30'}
                className={'w-auto'}
            >
                <TabsList className={'h-8 bg-muted'}>
                    <TabsTrigger
                        value={'7'}
                        className={'h-6 px-3 text-xs'}
                    >
                        7 Days
                    </TabsTrigger>
                    <TabsTrigger
                        value={'30'}
                        className={'h-6 px-3 text-xs'}
                    >
                        30 Days
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </CardHeader>
        <CardContent>
            <div className={'grid gap-6 lg:grid-cols-3'}>
                {/* Social Interaction */}
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

                {/* Morning Routine */}
                <div className={'rounded-xl bg-surface-section p-4'}>
                    <p className={'text-xs font-medium uppercase tracking-wider text-muted-foreground'}>
                        {InsightsDetailTexts.INSIGHTS_PATTERNS_OBSERVATION_LABEL}
                    </p>
                    <h4 className={'mt-1 font-semibold text-foreground'}>
                        {InsightsDetailTexts.INSIGHTS_PATTERNS_OBSERVATION_TITLE}
                    </h4>
                    <p className={'mt-2 text-sm text-muted-foreground'}>
                        {InsightsDetailTexts.INSIGHTS_PATTERNS_OBSERVATION_DESCRIPTION}
                    </p>
                    <div className={'mt-4'}>
                        <div className={'text-3xl font-bold text-primary'}>
                            {InsightsDetailTexts.INSIGHTS_PATTERNS_OBSERVATION_SUCCESS_VALUE}
                        </div>
                        <p className={'text-xs text-muted-foreground'}>
                            {InsightsDetailTexts.INSIGHTS_PATTERNS_OBSERVATION_SUCCESS_LABEL}
                        </p>
                    </div>
                </div>

                {/* Projected Recovery */}
                <div className={'rounded-xl bg-primary p-4 text-white'}>
                    <p className={'text-xs font-medium uppercase tracking-wider opacity-80'}>
                        {InsightsDetailTexts.INSIGHTS_PATTERNS_PREDICTION_LABEL}
                    </p>
                    <h4 className={'mt-1 font-semibold'}>
                        {InsightsDetailTexts.INSIGHTS_PATTERNS_PREDICTION_TITLE}
                    </h4>
                    <p className={'mt-2 text-sm opacity-90'}>
                        {InsightsDetailTexts.INSIGHTS_PATTERNS_PREDICTION_DESCRIPTION}
                    </p>
                    <Badge className={'mt-4 border-0 bg-white/20 text-white'}>
                        {InsightsDetailTexts.INSIGHTS_PATTERNS_PREDICTION_BADGE}
                    </Badge>
                </div>
            </div>
        </CardContent>
    </Card>
)
