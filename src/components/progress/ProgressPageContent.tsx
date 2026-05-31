'use client'

import { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'
import { useRecoveryGoalsStats } from '@/hooks/queries/useRecoveryGoalsStats'

import { FEATURES } from '@/config/features'

import { useAuth } from '@/context/AuthContext'
import { useCheckIn } from '@/context/CheckInContext'

import { checkInLocales } from '@/locales/checkInLocales'

import { ShareProgressCard } from './share/ShareProgressCard'
import { ShareProgressModal } from './share/ShareProgressModal'
import { ProgressStatsCharts } from './stats/ProgressStatsCharts'
import { ProgressMilestones } from './Milestones'
import { RecoveryInsight } from './RecoveryInsight'

export const ProgressPageContent = () => {
    const t = useTranslations()
    const [shareModalOpen, setShareModalOpen] = useState(false)
    const { user } = useAuth()
    const { isPending: isCheckInPending } = useCheckIn()
    const { data: stats } = useCheckInStats('weekly')
    const { data: goalsStats } = useRecoveryGoalsStats()

    useEffect(() => {
        const handler = () =>
            setShareModalOpen(true)
        window.addEventListener(
            'healease:share-progress',
            handler
        )

        return () =>
            window.removeEventListener(
                'healease:share-progress',
                handler
            )
    }, [])

    return (
        <>
            <div className={'p-6 space-y-6'}>
                {isCheckInPending && (
                    <div className={'rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary font-medium'}>
                        {t(checkInLocales.submitPendingMessage)}
                    </div>
                )}
                <ProgressStatsCharts/>
                <ProgressMilestones/>
                {FEATURES.motivationFeedback && (
                    <RecoveryInsight/>
                )}
            </div>

            {FEATURES.shareProgress && stats && (
                <ShareProgressModal
                    open={shareModalOpen}
                    onOpenChangeAction={setShareModalOpen}
                >
                    <ShareProgressCard
                        stats={stats}
                        milestonesCompleted={goalsStats?.milestones.completed}
                        userName={user
                            ? `${user.firstName} ${user.lastName}`
                            : undefined}
                    />
                </ShareProgressModal>
            )}
        </>
    )
}
