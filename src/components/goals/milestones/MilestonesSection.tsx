'use client'

import { useTranslations } from 'next-intl'

import { useGoalMilestones } from '@/hooks/context/useGoalMilestones'

import { goalsLocales } from '@/locales/goalsLocales'

import { MilestoneCard } from '../cards/MilestoneCard'

export const MilestonesSection = () => {
    const t = useTranslations()
    const {
        milestones,
        completeMilestoneOptimistic
    } = useGoalMilestones()

    const sorted = [...milestones]
        .sort((a, b) => a.order - b.order)
    const isEmpty = sorted.length === 0

    return (
        <section className={'mb-16'}>
            {isEmpty ? (
                // todo: use reusable empty state
                <div className={'py-12 px-6 bg-surface-container-lowest rounded-xl text-center'}>
                    <p className={'text-on-surface-variant text-lg'}>
                        {t(goalsLocales.milestones.empty)}
                    </p>
                    <p className={'text-on-surface-variant text-sm mt-2'}>
                        {t(goalsLocales.milestones.emptySubtitle)}
                    </p>
                </div>
            ) : (
                <div className={'relative'}>
                    <div className={'absolute left-10 top-8 bottom-8 w-0.5 bg-surface-container-high'}/>

                    <div className={'space-y-4'}>
                        {sorted.map((milestone) => (
                            <MilestoneCard
                                key={milestone.id}
                                milestone={milestone}
                                onCompleteAction={() =>
                                    completeMilestoneOptimistic(
                                        milestone.id
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}