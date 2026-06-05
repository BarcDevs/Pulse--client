'use client'

import { useTranslations } from 'next-intl'

import { goalsLocales } from '@/locales/goalsLocales'

type RecoveryGoalsHeaderProps = {
    description: string
}

export const RecoveryGoalsHeader = ({
    description
}: RecoveryGoalsHeaderProps) => {
    const t = useTranslations()

    return (
        <section className={'mb-12'}>
            <h1 className={'text-4xl md:text-5xl font-extrabold text-on-surface tracking-tighter mb-4'}>
                {t(goalsLocales.header.title)}
            </h1>
            <p className={'text-on-surface-variant text-lg max-w-2xl leading-relaxed'}>
                {description}
            </p>
        </section>
    )
}
