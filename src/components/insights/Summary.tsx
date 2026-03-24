import {FileText} from 'lucide-react'

// TODO: Icons for future use
// import {
//     Activity,
//     CheckCircle,
//     Sparkles,
//     TrendingUp
// } from 'lucide-react'
import {Button} from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import * as InsightsComponentTexts from '@/constants/insightsComponentTexts'

export const InsightsSummary = () => (
    <Card className={'mt-6 border-0 shadow-sm'}>
        <CardHeader className={'flex flex-row items-center justify-between'}>
            <div>
                <CardTitle className={'text-lg font-semibold'}>
                    {InsightsComponentTexts.INSIGHTS_SUMMARY_TITLE}
                </CardTitle>
                <p className={'text-sm text-muted-foreground'}>
                    {InsightsComponentTexts.INSIGHTS_SUMMARY_DESCRIPTION}
                </p>
            </div>
            <Button
                variant={'outline'}
                className={'gap-2'}
            >
                <FileText className={'size-4'}/>
                {InsightsComponentTexts.INSIGHTS_SUMMARY_EXPORT_BUTTON}
            </Button>
        </CardHeader>
        <CardContent>
            <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
                {InsightsComponentTexts.INSIGHTS_SUMMARY_STATS.map((stat) => (
                            <div
                                key={stat.label}
                                className={'rounded-xl bg-surface-section p-4'}
                            >
                                <p className={'text-xs font-medium uppercase tracking-wider text-muted-foreground'}>
                                    {stat.label}
                                </p>
                                <div className={'mt-2 flex items-baseline gap-2'}>
                                    <span className={'text-2xl font-bold text-foreground'}>
                                        {stat.value}
                                    </span>
                                    <span className={`text-sm ${stat.trendColor}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                                <p className={'mt-1 text-sm text-muted-foreground'}>
                                    {stat.description}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </CardContent>
        </Card>
    )
