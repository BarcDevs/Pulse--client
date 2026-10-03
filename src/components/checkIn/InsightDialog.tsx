'use client'

import { useTranslations } from 'next-intl'

import type { CheckInInsight } from '@/types/checkIn'

import { BaseDialog } from '@/components/shared/BaseDialog'
import { Button } from '@/components/shared/buttons/Button'

import { checkInLocales } from '@/locales/checkInLocales'
import { insightsLocales } from '@/locales/insightsLocales'

import { InsightDialogItem } from './InsightDialogItem'

type InsightDialogProps = {
    insights: CheckInInsight[]
    onOpenChangeAction: (isOpen: boolean) => void
}

export const InsightDialog = ({
    insights,
    onOpenChangeAction
}: InsightDialogProps) => {
    const t = useTranslations()

    return (
        <BaseDialog
            open={insights.length > 0}
            onOpenChangeAction={onOpenChangeAction}
            title={t(insightsLocales.title)}
            className={'dialog-scrollable'}
        >
            <div className={'space-y-3'}>
                {insights.map((insight) => (
                    <InsightDialogItem
                        key={insight.id}
                        insight={insight}
                    />
                ))}
            </div>
            <div className={'flex justify-center'}>
                <Button
                    variant={'secondary'}
                    onClick={() => onOpenChangeAction(false)}
                >
                    {t(checkInLocales.insightToast.close)}
                </Button>
            </div>
        </BaseDialog>
    )
}
