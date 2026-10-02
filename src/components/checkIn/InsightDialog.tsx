'use client'

import { useTranslations } from 'next-intl'

import type { CheckInInsight } from '@/types/checkIn'

import { BaseDialog } from '@/components/shared/BaseDialog'
import { Button } from '@/components/shared/buttons/Button'

import { checkInLocales } from '@/locales/checkInLocales'

type InsightDialogProps = {
    insight: CheckInInsight | null
    onOpenChangeAction: (isOpen: boolean) => void
}

export const InsightDialog = ({
    insight,
    onOpenChangeAction
}: InsightDialogProps) => {
    const t = useTranslations()

    return (
        <BaseDialog
            open={!!insight}
            onOpenChangeAction={onOpenChangeAction}
            title={insight?.title}
            description={insight?.content}
            className={'max-h-[85dvh] overflow-y-auto'}
            descriptionClassName={'whitespace-pre-line text-foreground'}
        >
            <div className={'flex justify-center mt-2'}>
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
