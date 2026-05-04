import { useTranslations } from 'next-intl'

import { AlertTriangle, BarChart3 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { insightsLocales } from '@/locales/insightsLocales'

export const CriticalInsight = () => {
    const t = useTranslations()

    return (
        <div className={'card-base'}>
            <div className={'flex items-center gap-2 mb-4'}>
                <span className={'badge-base bg-destructive/10 text-destructive'}>
                    <AlertTriangle className={'h-3 w-3'}/>
                    {t(insightsLocales.criticalInsight.label)}
                </span>
            </div>

            <h2 className={'text-2xl font-bold text-foreground leading-tight'}>
                {t(insightsLocales.criticalInsight.title)}
            </h2>

            <p className={'mt-3 text-muted-foreground leading-relaxed'}>
                {t(insightsLocales.criticalInsight.description)}
            </p>

            <div className={'mt-6 flex items-center gap-3'}>
                <Button className={'bg-primary hover:bg-primary/90 text-primary-foreground'}>
                    {t(insightsLocales.criticalInsight.buttonPrimary)}
                </Button>
                <Button variant={'ghost'} className={'text-muted-foreground'}>
                    <BarChart3 className={'mr-2 h-4 w-4'}/>
                    {t(insightsLocales.criticalInsight.buttonSecondary)}
                </Button>
            </div>
        </div>
    )
}
