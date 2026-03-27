import {FileText} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {cn} from '@/lib/utils'

import {insightsPageTexts}
    from '@/constants/componentTexts/insightsComponent'

export const InsightsSummary = () => (
    <Card className={'mt-6 border-0 shadow-sm'}>
        <CardHeader className={'flex flex-row items-center justify-between'}>
            <div>
                <CardTitle className={'text-lg font-semibold'}>
                    {insightsPageTexts.summary.title}
                </CardTitle>
                <p className={'text-sm text-muted-foreground'}>
                    {insightsPageTexts.summary.description}
                </p>
            </div>
            <Button
                variant={'outline'}
                className={'gap-2'}
            >
                <FileText className={'size-4'}/>
                {insightsPageTexts.summary.exportButton}
            </Button>
        </CardHeader>
        <CardContent>
            <div className={'grid gap-4 sm:grid-cols-2 lg:grid-cols-4'}>
                {insightsPageTexts.summary.stats.map((stat) => (
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
                                <span className={cn('text-sm', stat.trendColor)}>
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
