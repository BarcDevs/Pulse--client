import { useTranslations } from 'next-intl'

import { Button } from '@/components/shared/buttons/Button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

import { insightsLocales } from '@/locales/insightsLocales'

export const InsightsHeader = () => {
    const t = useTranslations()

    return (
    <Card className={'border-0 shadow-sm'}>
        <CardContent className={'pt-6'}>
        <Badge className={'mb-4 border-0 bg-red-100 text-red-600'}>
            {t(insightsLocales.header.badge)}
        </Badge>
        <h2 className={'text-2xl font-semibold text-foreground text-balance'}>
            {t(insightsLocales.header.title)}
        </h2>
        <p className={'mt-3 text-muted-foreground'}>
            {t(insightsLocales.header.description)}
        </p>
        <div className={'mt-6 flex gap-3'}>
            <Button>
                {t(insightsLocales.header.buttonPrimary)}
            </Button>
            <Button variant={'secondary'}>
                {t(insightsLocales.header.buttonSecondary)}
            </Button>
        </div>
            </CardContent>
        </Card>
    )
}
