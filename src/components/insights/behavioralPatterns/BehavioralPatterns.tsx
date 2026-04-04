'use client'

import { useState } from 'react'

import { insightsPageTexts }
    from '@/constants/componentTexts/insightsComponent'

import { BehavioralPatternsTabs } from './BehavioralPatternsTabs'
import { CorrelationCard } from './CorrelationCard'
import { ObservationCard } from './ObservationCard'
import { PredictionCard } from './PredictionCard'

export const BehavioralPatterns = () => {
    const [activeTab, setActiveTab] =
        useState<'7days' | '30days'>('30days')

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center justify-between mb-6'}>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {insightsPageTexts.behavioralPatterns.title}
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
