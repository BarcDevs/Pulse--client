'use client'

import { useEffect, useState } from 'react'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'
import { useRecoveryGoalsStats } from '@/hooks/queries/useRecoveryGoalsStats'

import { FEATURES } from '@/config/features'

import { useAuth } from '@/context/AuthContext'

import { ShareProgressCard } from './share/ShareProgressCard'
import { ShareProgressModal } from './share/ShareProgressModal'
import { ProgressStatsCharts } from './stats/ProgressStatsCharts'
import { ProgressMilestones } from './Milestones'
import { RecoveryInsight } from './RecoveryInsight'

// TODO: Add error card to Milestones & Achievements section when API errors occur
export const ProgressPageContent = () => {
    const [shareModalOpen, setShareModalOpen] = useState(false)
    const { user } = useAuth()
    const { data: stats } = useCheckInStats('weekly')
    const { data: goalsStats } = useRecoveryGoalsStats()

    useEffect(() => {
        const handler = () => setShareModalOpen(true)
        window.addEventListener('healease:share-progress', handler)

        return () => window
            .removeEventListener('healease:share-progress', handler)
    }, [])

    return (
        <>
            <div className={'p-6 space-y-6'}>
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
