'use client'

import {
    useEffect,
    useState
} from 'react'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/shared/buttons/Button'

import { useGuestResultCheckIn } from '@/hooks/queries/useGuestResultCheckIn'

import { ROUTES } from '@/constants/routes'

import { timings } from '@/config/timings'

import { useAuth } from '@/context/AuthContext'

import { startLocales } from '@/locales/startLocales'

import { GuestInsightCard } from './GuestInsightCard'
import { GuestResultCharts } from './GuestResultCharts'
import { SaveProgressDialog } from './SaveProgressDialog'

export const GuestResultPage = () => {
    const t = useTranslations()
    const router = useRouter()
    const { user, isLoading } = useAuth()
    const [isSaveOpen, setIsSaveOpen] = useState(false)
    const [isUpgrading, setIsUpgrading] = useState(false)
    const isGuest = !!user?.isGuest
    const {
        data: checkIn,
        isFetching
    } = useGuestResultCheckIn(isGuest && !isUpgrading)
    const hasInsights = !!checkIn?.insights?.length
    const hasNoCheckIn = checkIn === null && !isFetching

    useEffect(() => {
        if (isLoading) return
        if (!user) router.replace(ROUTES.START)
        else if (!user.isGuest) router.replace(ROUTES.DASHBOARD)
        else if (hasNoCheckIn) router.replace(ROUTES.START)
    }, [user, isLoading, hasNoCheckIn, router])

    useEffect(() => {
        if (!hasInsights || isUpgrading) return
        const timer = setTimeout(
            () => setIsSaveOpen(true),
            timings.GUEST_SAVE_PROMPT_DELAY
        )
        return () => clearTimeout(timer)
    }, [hasInsights, isUpgrading])

    if (!isGuest) return null

    return (
        <div className={'flex-1 p-4 md:p-6'}>
            <div className={'mx-auto max-w-3xl space-y-6'}>
                <h1 className={'text-center text-3xl font-semibold text-foreground'}>
                    {t(startLocales.result.title)}
                </h1>
                <GuestInsightCard checkIn={checkIn}/>
                <GuestResultCharts/>
                <div className={'flex justify-center'}>
                    <Button
                        size={'lg'}
                        onClick={() => setIsSaveOpen(true)}
                        disabled={isUpgrading}
                        data-testid={'guest-save-open'}
                    >
                        {t(startLocales.result.saveButton)}
                    </Button>
                </div>
            </div>
            <SaveProgressDialog
                open={isSaveOpen}
                onOpenChangeAction={setIsSaveOpen}
                onUpgradingChangeAction={setIsUpgrading}
            />
        </div>
    )
}
