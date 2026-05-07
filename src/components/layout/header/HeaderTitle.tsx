'use client'

import { useTranslations } from 'next-intl'

type HeaderTitleProps = {
    title: string
    subtitle?: string
}

export const HeaderTitle = ({
    title,
    subtitle
}: HeaderTitleProps) => {
    const t = useTranslations()

    return (
        <div className={'flex items-center gap-4'}>
            <div>
                <h1 className={'text-lg font-semibold text-foreground'}>
                    {t(title)}
                </h1>
                {subtitle && (
                    <p className={'text-sm text-muted-foreground'}>
                        {t(subtitle)}
                    </p>
                )}
            </div>
        </div>
    )
}
