'use client'

import { useEffect, useState } from 'react'

import {
    CheckCircle2,
    Lightbulb
} from 'lucide-react'

import { recoveryGoalsPageTexts } from '@/constants/componentTexts/recoveryGoals'

type RandomData = {
    bundle: { body: string; tips: string[] }
    tip: string
}

export const GoalFormSmartTip = () => {
    const bundles = recoveryGoalsPageTexts.goalForm.smartTip.bundles
    const [randomData, setRandomData] = useState<
        RandomData
    >(() => {
        const bundle = bundles[0]
        return {
            bundle,
            tip: bundle.tips[0]
        }
    })

    useEffect(
        () => {
            queueMicrotask(() => {
                const bundleIndex = Math.floor(
                    Math.random() * bundles.length
                )
                const bundle = bundles[bundleIndex]
                const tipIndex = Math.floor(
                    Math.random() * bundle.tips.length
                )
                setRandomData({
                    bundle,
                    tip: bundle.tips[tipIndex]
                })
            })
        },
        [bundles]
    )

    return (
        <div className={'p-6 rounded-2xl bg-surface-container-low'}>
            <div className={'flex items-center gap-3 mb-4'}>
                <Lightbulb
                    size={20}
                    className={'text-secondary'}
                />
                <h3 className={'font-headline font-bold text-on-surface'}>
                    {recoveryGoalsPageTexts.goalForm.smartTip.title}
                </h3>
            </div>

            <p className={'text-sm text-on-surface-variant leading-relaxed mb-4'}>
                {randomData.bundle.body}
            </p>

            <div className={'flex items-start gap-2'}>
                <CheckCircle2
                    size={16}
                    className={'text-secondary mt-0.5 shrink-0'}
                />
                <p className={'text-xs font-body text-on-surface'}>
                    {randomData.tip}
                </p>
            </div>
        </div>
    )
}
