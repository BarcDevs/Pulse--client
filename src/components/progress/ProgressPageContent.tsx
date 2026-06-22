'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { SavingBanner } from '@/components/shared/SavingBanner'

import { useCheckInStats } from '@/hooks/queries/useCheckInStats'
import { useRecoveryGoalsStats } from '@/hooks/queries/useRecoveryGoalsStats'

import { buildShareProgressDraft } from '@/lib/community/buildShareProgressDraft'

import { DRAFT_KEYS, saveDraft } from '@/utils/communityDraft'

import { ROUTES } from '@/constants/routes'

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
    const router = useRouter()
    const [shareModalOpen, setShareModalOpen] = useState(false)
    const { user } = useAuth()
    const { isPending: isCheckInPending } = useCheckIn()
    const { data: stats } = useCheckInStats('weekly')
    const { data: goalsStats } = useRecoveryGoalsStats()

    const handleShareToCommunity = () => {
        if (!stats) return
        saveDraft(
            DRAFT_KEYS.newPost,
            'newPost',
            buildShareProgressDraft(
                t,
                stats,
                goalsStats?.milestones.completed
            )
        )
        setShareModalOpen(false)
        router.push(ROUTES.COMMUNITY)
    }

    useEffect(() => {
        const handler = () =>
            setShareModalOpen(true)
        window.addEventListener(
            'pulse:share-progress',
            handler
        )

        return () =>
            window.removeEventListener(
                'pulse:share-progress',
                handler
            )
    }, [])

    return (
        <>
            <div className={'p-6 space-y-6'}>
                {isCheckInPending && (
                    <SavingBanner message={t(checkInLocales.submitPendingMessage)}/>
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
                    onShareToCommunityAction={handleShareToCommunity}
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
