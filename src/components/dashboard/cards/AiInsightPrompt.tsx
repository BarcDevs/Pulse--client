'use client'

import { useTranslations } from 'next-intl'

import { Sparkles } from 'lucide-react'

import { dashboardLocales } from '@/locales/dashboardLocales'

export const DashboardInsightPrompt = () => {
    const t = useTranslations()

    return (
        <div className={'space-y-3 rounded-2xl bg-surface-card p-5'}>
            <div className={'flex items-center gap-2'}>
                <Sparkles className={'size-4 text-purple'}/>
                <h3 className={'text-sm font-medium text-muted-foreground'}>
                    {t(dashboardLocales.aiInsight.label)}
                </h3>
            </div>
            <p className={'text-sm text-foreground'}>
                {t(dashboardLocales.aiInsight.checkInPrompt)}
            </p>
        </div>
    )
}
