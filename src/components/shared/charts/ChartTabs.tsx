'use client'

import { useTranslations } from 'next-intl'

import {
    Tabs,
    TabsList,
    TabsTrigger
} from '@/components/ui/tabs'

import { progressLocales } from '@/locales/progressLocales'

type ChartTabsProps = {
    defaultValue?: string
    onValueChangeAction?: (value: string) => void
}

export const ChartTabs = ({
    defaultValue = 'weekly',
    onValueChangeAction
}: ChartTabsProps) => {
    const t = useTranslations()

    return (
        <Tabs
            defaultValue={defaultValue}
            onValueChange={onValueChangeAction}
            className={'w-auto'}
        >
            <TabsList className={'h-8 bg-muted'}>
                <TabsTrigger
                    value={'weekly'}
                    className={'h-6 px-3 text-xs'}
                >
                    {t(progressLocales.charts.timePeriods.weekly)}
                </TabsTrigger>
                <TabsTrigger
                    value={'monthly'}
                    className={'h-6 px-3 text-xs'}
                >
                    {t(progressLocales.charts.timePeriods.monthly)}
                </TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
