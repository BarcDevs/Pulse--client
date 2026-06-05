import { useTranslations } from 'next-intl'

import { FileText } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { insightsLocales } from '@/locales/insightsLocales'

import { StatsCards } from '../stats/StatsCards'

export const InsightsSummary = () => {
    const t = useTranslations()

    return (
    <Card className={'mt-6 border-0 shadow-sm'}>
        <CardHeader className={'flex flex-row items-center justify-between'}>
            <div>
        <CardTitle className={'text-lg font-semibold'}>
            {t(insightsLocales.summary.title)}
        </CardTitle>
        <p className={'text-sm text-muted-foreground'}>
            {t(insightsLocales.summary.description)}
        </p>
            </div>
            <Button
                variant={'outline'}
                className={'gap-2'}
            >
                <FileText className={'size-4'}/>
                {t(insightsLocales.summary.exportButton)}
            </Button>
        </CardHeader>

        <StatsCards/>
    </Card>
    )
}
