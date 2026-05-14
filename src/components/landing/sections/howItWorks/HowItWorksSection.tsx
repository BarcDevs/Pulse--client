'use client'

import { useTranslations } from 'next-intl'

import { HOW_IT_WORKS_STEPS } from '@/constants/landing/howItWorksSteps'

import { landingLocales } from '@/locales/landingLocales'

import { RecoveryChartPreview } from './RecoveryChartPreview'
import { StepItem } from './StepItem'

export const HowItWorksSection = () => {
    const t = useTranslations()

    return (
        <section
            id={'how-it-works'}
            className={'px-6 py-16 md:px-12'}
        >
            <div className={'mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center'}>
                <div>
                    <h2 className={'mb-10 text-3xl font-bold tracking-tight text-foreground'}>
                        {t(landingLocales.howItWorks.sectionTitle)}
                    </h2>

                    <div className={'flex flex-col gap-7'}>
                        {HOW_IT_WORKS_STEPS.map(step => (
                            <StepItem
                                key={step.titleKey}
                                titleKey={step.titleKey}
                                descKey={step.descKey}
                            />
                        ))}
                    </div>
                </div>

                <RecoveryChartPreview/>
            </div>
        </section>
    )
}
