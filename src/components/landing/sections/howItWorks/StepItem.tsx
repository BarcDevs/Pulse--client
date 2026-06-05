'use client'

import { useTranslations } from 'next-intl'

type StepItemProps = {
    stepNumber: number
    titleKey: string
    descKey: string
}

export const StepItem = ({
    stepNumber,
    titleKey,
    descKey
}: StepItemProps) => {
    const t = useTranslations()

    return (
        <div className={'flex gap-[18px]'}>
            <div className={'flex size-[34px] shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary-gradient-start to-primary'}>
                <span className={'text-sm font-bold text-primary-foreground'}>{stepNumber}</span>
            </div>
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
