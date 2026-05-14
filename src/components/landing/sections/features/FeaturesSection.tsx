'use client'

import { useTranslations } from 'next-intl'

import { landingLocales } from '@/locales/landingLocales'

import { FeatureCards } from './FeatureCards'

export const FeaturesSection = () => {
    const t = useTranslations()

    return (
        <section
            id={'features'}
            className={'bg-surface-section px-6 py-16 md:px-12'}
        >
            <div className={'mx-auto max-w-7xl'}>
                <h2 className={'mb-3 text-center text-3xl font-bold tracking-tight text-foreground'}>
                    {t(landingLocales.features.sectionTitle)}
                </h2>
                <p className={'mx-auto mb-12 max-w-xl text-center text-sm leading-relaxed text-muted-foreground'}>
                    {t(landingLocales.features.sectionDesc)}
                </p>

                <FeatureCards/>
            </div>
        </section>
    )
}
