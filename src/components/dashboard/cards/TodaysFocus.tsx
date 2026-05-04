'use client'

import { useTranslations } from 'next-intl'

import { Brain } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

import { dashboardLocales } from '@/locales/dashboardLocales'

export const DashboardTodaysFocus = () => {
    const t = useTranslations()

    return (
        <Card className={'border-0 shadow-sm'}>
            <CardHeader className={'pb-3'}>
                <div className={'flex items-center justify-between'}>
                    <CardTitle className={'text-base font-medium text-muted-foreground'}>
                        {t(dashboardLocales.todaysFocus.label)}
                    </CardTitle>
                    <Badge
                        variant={'secondary'}
                        className={'bg-primary-light text-primary'}
                    >
                        {t(dashboardLocales.todaysFocus.badge)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className={'flex items-start gap-4'}>
                    <div className={'flex--center size-12 shrink-0 rounded-xl bg-primary-light'}>
                        <Brain className={'size-6 text-primary'}/>
                    </div>
                    <div>
                        <h3 className={'text-xl font-semibold text-foreground'}>
                            {t(dashboardLocales.todaysFocus.title)}
                        </h3>
                        <p className={'mt-1 text-sm text-muted-foreground'}>
                            {t(dashboardLocales.todaysFocus.description)}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
