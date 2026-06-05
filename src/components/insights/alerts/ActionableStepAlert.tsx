import { useTranslations } from 'next-intl'

import { Lightbulb } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { insightsLocales } from '@/locales/insightsLocales'

export const ActionableStepAlert = () => {
    const t = useTranslations()

    return (
        <div className={'rounded-2xl bg-secondary/5 border border-secondary/20 p-6'}>
            <div className={'flex items-start gap-3'}>
                <div className={'p-2 rounded-lg bg-secondary/10'}>
                    <Lightbulb className={'h-5 w-5 text-secondary'}/>
                </div>
                <div className={'flex-1'}>
                    <h3 className={'font-semibold text-foreground'}>
                        {t(insightsLocales.actionableStep.title)}
                    </h3>
                    <p className={'mt-1 text-sm text-muted-foreground leading-relaxed'}>
                        {t(insightsLocales.actionableStep.description)}
                    </p>
                    <div className={'mt-4'}>
                        <Button
                            size={'sm'}
                            className={'bg-secondary hover:bg-secondary/90 text-secondary-foreground'}
                        >
                            {t(insightsLocales.actionableStep.button)}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}