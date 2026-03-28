import {FileText} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {
    Card,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import {insightsPageTexts}
    from '@/constants/componentTexts/insightsComponent'

import {StatsCards} from './stats/StatsCards'

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

        <StatsCards/>
    </Card>
)
