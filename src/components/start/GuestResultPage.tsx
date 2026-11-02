'use client'

import {
    useEffect,
    useState
} from 'react'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Bookmark } from 'lucide-react'

import { Button } from '@/components/shared/buttons/Button'

import { useGuestResultCheckIn } from '@/hooks/queries/useGuestResultCheckIn'

import { ROUTES } from '@/constants/routes'

import { timings } from '@/config/timings'

import { useAuth } from '@/context/AuthContext'

import { startLocales } from '@/locales/startLocales'

import { GuestHeader } from './GuestHeader'
import { GuestInsightCard } from './GuestInsightCard'
import { GuestResultCharts } from './GuestResultCharts'
import { GuestSaveBar } from './GuestSaveBar'
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
    const openSave = () => setIsSaveOpen(true)

    useEffect(() => {
        if (isLoading) return
        if (!user) router.replace(ROUTES.START)
        else if (!user.isGuest) router.replace(ROUTES.DASHBOARD)
        else if (hasNoCheckIn) router.replace(ROUTES.START)
    }, [user, isLoading, hasNoCheckIn, router])

    useEffect(() => {
        if (!hasInsights || isUpgrading) return
        const timer = setTimeout(
            openSave,
            timings.GUEST_SAVE_PROMPT_DELAY
        )
        return () => clearTimeout(timer)
    }, [hasInsights, isUpgrading])

    if (!isGuest) return null

    return (
        <div className={'flex min-h-screen flex-col bg-surface-page'}>
            <GuestHeader>
                <Button
                    size={'sm'}
                    onClick={openSave}
                    disabled={isUpgrading}
                    className={'hidden md:inline-flex'}
                    data-testid={'guest-save-open'}
                >
                    <Bookmark className={'size-4.5'}/>
                    {t(startLocales.result.saveButton)}
                </Button>
            </GuestHeader>
            <main className={'mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6 md:gap-5 md:py-8'}>
                <h1 className={'sr-only'}>
                    {t(startLocales.result.title)}
                </h1>
                <GuestInsightCard checkIn={checkIn}/>
                {checkIn && <GuestResultCharts checkIn={checkIn}/>}
            </main>
            <GuestSaveBar
                disabled={isUpgrading}
                onSaveAction={openSave}
            />
            <SaveProgressDialog
                open={isSaveOpen}
                onOpenChangeAction={setIsSaveOpen}
                onUpgradingChangeAction={setIsUpgrading}
            />
        </div>
    )
}
