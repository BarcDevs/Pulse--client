'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { insightsLocales } from '@/locales/insightsLocales'

import { BehavioralPatternsTabs } from './BehavioralPatternsTabs'
import { CorrelationCard } from './CorrelationCard'
import { ObservationCard } from './ObservationCard'
import { PredictionCard } from './PredictionCard'

export const BehavioralPatterns = () => {
    const t = useTranslations()
    const [activeTab, setActiveTab] =
        useState<'7days' | '30days'>('30days')

    return (
        <div className={'card-base'}>
            <div className={'flex-center-between mb-6'}>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {t(insightsLocales.behavioralPatterns.title)}
                </h3>
                <BehavioralPatternsTabs
                    activeTab={activeTab}
                    onTabChangeAction={setActiveTab}
                />
            </div>

            <div className={'grid grid-cols-1 md:grid-cols-3 gap-6'}>
                <CorrelationCard/>
                <ObservationCard/>
                <PredictionCard/>
            </div>
        </div>
    )
}
