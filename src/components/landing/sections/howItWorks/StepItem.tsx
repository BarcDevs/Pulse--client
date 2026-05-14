'use client'

import { useTranslations } from 'next-intl'

type StepItemProps = {
    titleKey: string
    descKey: string
}

export const StepItem = ({
    titleKey,
    descKey
}: StepItemProps) => {
    const t = useTranslations()

    return (
        <div className={'flex gap-4'}>
            <div className={'mt-1 size-2 shrink-0 rounded-full bg-primary'}/>
            <div>
                <h4 className={'mb-1.5 text-base font-bold text-foreground'}>
                    {t(titleKey)}
                </h4>
                <p className={'text-sm leading-relaxed text-muted-foreground'}>
                    {t(descKey)}
                </p>
            </div>
        </div>
    )
}
