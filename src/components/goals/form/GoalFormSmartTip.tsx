'use client'

import {
    useEffect,
    useMemo,
    useState
} from 'react'

import { useTranslations } from 'next-intl'

import {
    CheckCircle2,
    Lightbulb
} from 'lucide-react'

import { goalsLocales } from '@/locales/goalsLocales'

type RandomData = {
    bundle: {
        body: string
        tips: string[]
    }
    tip: string
}

export const GoalFormSmartTip = () => {
    const t = useTranslations()
    // smartTip.bundles is an array object, not a translation key string
    const bundles = useMemo(() => [
        {
            body: t('goals.goalForm.smartTip.bundles.0.body'),
            tips: [
                t('goals.goalForm.smartTip.bundles.0.tips.0'),
                t('goals.goalForm.smartTip.bundles.0.tips.1'),
                t('goals.goalForm.smartTip.bundles.0.tips.2'),
                t('goals.goalForm.smartTip.bundles.0.tips.3'),
                t('goals.goalForm.smartTip.bundles.0.tips.4')
            ]
        },
        {
            body: t('goals.goalForm.smartTip.bundles.1.body'),
            tips: [
                t('goals.goalForm.smartTip.bundles.1.tips.0'),
                t('goals.goalForm.smartTip.bundles.1.tips.1'),
                t('goals.goalForm.smartTip.bundles.1.tips.2'),
                t('goals.goalForm.smartTip.bundles.1.tips.3'),
                t('goals.goalForm.smartTip.bundles.1.tips.4')
            ]
        },
        {
            body: t('goals.goalForm.smartTip.bundles.2.body'),
            tips: [
                t('goals.goalForm.smartTip.bundles.2.tips.0'),
                t('goals.goalForm.smartTip.bundles.2.tips.1'),
                t('goals.goalForm.smartTip.bundles.2.tips.2'),
                t('goals.goalForm.smartTip.bundles.2.tips.3'),
                t('goals.goalForm.smartTip.bundles.2.tips.4')
            ]
        }
    ], [t])

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
                    {t(goalsLocales.goalForm.smartTip.title)}
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
