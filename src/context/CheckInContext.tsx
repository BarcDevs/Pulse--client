'use client'

import {
    createContext,
    useContext,
    useState
} from 'react'

import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

import { he } from 'date-fns/locale'
import { toast } from 'sonner'

import { useQueryClient } from '@tanstack/react-query'

import type {
    CheckIn,
    CheckInStats,
    MoodPainSeriesPoint
} from '@/types/checkIn'
import { ContextProps } from '@/types/react'

import { useProfile } from '@/hooks/queries/useProfile'

import {
    formatByUserPreference,
    parseDateOnly,
    toDateStr,
    toDateStrInTimezone
} from '@/lib/time'

import { defaults } from '@/constants/defaults'
import { checkInQueryKeys } from '@/constants/queryKeys'
import { ROUTES } from '@/constants/routes'
import { secondInMs } from '@/constants/time'

import { handleCheckInSubmit } from '@/handlers/actions/checkIn'

import {
    fetchCheckInHistory,
    fetchCheckIns,
    fetchCheckInStats
} from '@/api/checkIn'
import { checkInLocales } from '@/locales/checkInLocales'
import { globalLocales } from '@/locales/globalLocales'
import { CheckInSchema } from '@/validations/forms/checkInSchema'

type CheckInContextType = {
    isPending: boolean
    isSubmitted: boolean
    submitCheckIn: (data: CheckInSchema) => void
}

export const CheckInContext =
    createContext<CheckInContextType | null>(null)

export const CheckInProvider = ({
    children
}: ContextProps) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const t = useTranslations()
    const locale = useLocale()
    const { profile } = useProfile()
    const dateFnsLocale = locale === 'he-IL' ? he : undefined
    const [isPending, setIsPending] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const runSubmit = async (
        data: CheckInSchema,
        onRollback: () => void,
        onReapply: () => () => void
    ) => {
        try {
            const checkIn = await handleCheckInSubmit(data)
            checkIn.insights?.forEach((insight) => {
                toast(insight.title, {
                    description: insight.content,
                    duration: 8 * secondInMs
                })
            })
            void queryClient.invalidateQueries({
                queryKey: checkInQueryKeys.all
            })
        } catch {
            onRollback()
            toast.error(t(checkInLocales.submitError), {
                action: {
                    label: t(globalLocales.shared.retry),
                    onClick: () => {
                        setIsPending(true)
                        const newRollback = onReapply()
                        void runSubmit(
                            data,
                            newRollback,
                            onReapply
                        )
                    }
                },
                duration: 5 * secondInMs
            })
        } finally {
            setIsPending(false)
            setIsSubmitted(false)
        }
    }

    const buildOptimisticStats = (
        existing: CheckInStats,
        formData: CheckInSchema,
        isEditingToday: boolean,
        hasYesterdayCheckIn: boolean | undefined
    ): CheckInStats => {
        if (isEditingToday) return existing

        const total = existing.totalCheckIns + 1
        const newStreak = hasYesterdayCheckIn === undefined
            ? existing.currentStreak
            : hasYesterdayCheckIn
                ? existing.currentStreak + 1
                : 1
        return {
            ...existing,
            totalCheckIns: total,
            total,
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, existing.longestStreak),
            averageMoodScore: Math.round(
                (
                    existing.averageMoodScore
                    * existing.totalCheckIns
                    + formData.moodScore
                ) / total * 10
            ) / 10,
            averagePainLevel: Math.round(
                (
                    existing.averagePainLevel
                    * existing.totalCheckIns
                    + formData.painLevel
                ) / total * 10
            ) / 10
        }
    }

    const submitCheckIn = (data: CheckInSchema) => {
        const statsKey = [...checkInQueryKeys.stats, 'weekly'] as const
        const historyKey14 = [...checkInQueryKeys.all, 'history', 14, dateFnsLocale?.code] as const
        const historyKey35 = [...checkInQueryKeys.all, 'history', 35, dateFnsLocale?.code] as const
        const checkInsKey14 = [...checkInQueryKeys.all, 'list', 14] as const

        const now = new Date()
        const todayDateStr = toDateStrInTimezone(now, profile?.timezone)
        const todayStr = `${todayDateStr}T00:00:00.000Z`
        const todayDate = parseDateOnly(todayDateStr)
        const yesterday = new Date(todayDate)
        yesterday.setDate(todayDate.getDate() - 1)
        const yesterdayStr = toDateStr(yesterday)
        const optimisticCheckIn: CheckIn = {
            id: 'optimistic',
            userId: '',
            checkInDate: todayStr,
            moodScore: data.moodScore,
            painLevel: data.painLevel,
            activities: data.activities,
            notes: data.notes,
            createdAt: now.toISOString(),
            updatedAt: now.toISOString()
        }
        const newPoint: MoodPainSeriesPoint = {
            date: formatByUserPreference(
                todayDate,
                true,
                defaults.checkIn.dateFormat,
                dateFnsLocale
            ),
            originalDate: todayStr,
            mood: data.moodScore,
            pain: data.painLevel
        }

        const applyOptimistic = () => {
            const curHistory = queryClient
                .getQueryData<MoodPainSeriesPoint[]>(
                    historyKey14
                )
            const curStats = queryClient
                .getQueryData<CheckInStats>(
                    statsKey
                )
            let rolledBack = false

            const upsertHistory = (
                history: MoodPainSeriesPoint[]
            ) => history.some(p => p.date === newPoint.date)
                ? history.map(p => p.date === newPoint.date ? newPoint : p)
                : [newPoint, ...history]

            const isEditingToday = (curHistory ?? [])
                .some(p => p.date === newPoint.date)

            if (curHistory) {
                queryClient.setQueryData(
                    historyKey14,
                    upsertHistory(curHistory)
                )
            } else {
                void queryClient.prefetchQuery({
                    queryKey: historyKey14,
                    queryFn: () =>
                        fetchCheckInHistory(
                            14,
                            dateFnsLocale
                        )
                }).then(() => {
                    if (rolledBack) return
                    const fetched = queryClient.getQueryData<
                        MoodPainSeriesPoint[]
                    >(historyKey14)
                    if (fetched) {
                        queryClient.setQueryData(
                            historyKey14,
                            upsertHistory(fetched)
                        )
                    }
                })
            }

            const curCheckIns = queryClient
                .getQueryData<CheckIn[]>(checkInsKey14)

            const hasYesterdayCheckIn = curCheckIns
                ? curCheckIns.some(
                    c => c.checkInDate.slice(0, 10) === yesterdayStr
                ) : curHistory
                    ? curHistory.some(
                        p => p.originalDate.slice(0, 10) === yesterdayStr
                    ) : undefined

            const upsertCheckIns = (
                checkIns: CheckIn[]
            ) => isEditingToday
                ? checkIns.map(c =>
                    c.checkInDate.slice(0, 10) === todayStr.slice(0, 10)
                        ? {
                            ...c,
                            ...optimisticCheckIn, id: c.id
                        } : c)
                : [optimisticCheckIn, ...checkIns]

            if (curCheckIns) {
                queryClient.setQueryData<CheckIn[]>(
                    checkInsKey14,
                    upsertCheckIns(curCheckIns)
                )
            } else {
                void queryClient.prefetchQuery({
                    queryKey: checkInsKey14,
                    queryFn: () => fetchCheckIns(14)
                }).then(() => {
                    if (rolledBack) return
                    const fetched = queryClient
                        .getQueryData<CheckIn[]>(checkInsKey14)
                    if (fetched) {
                        queryClient.setQueryData<CheckIn[]>(
                            checkInsKey14,
                            upsertCheckIns(fetched)
                        )
                    }
                })
            }

            if (curStats) {
                queryClient.setQueryData<CheckInStats>(
                    statsKey,
                    buildOptimisticStats(
                        curStats,
                        data,
                        isEditingToday,
                        hasYesterdayCheckIn
                    )
                )
            } else {
                void queryClient.prefetchQuery({
                    queryKey: statsKey,
                    queryFn: () => fetchCheckInStats('weekly')
                }).then(() => {
                    if (rolledBack) return
                    const fetched =
                        queryClient.getQueryData<CheckInStats>(statsKey)
                    if (fetched) {
                        queryClient.setQueryData<CheckInStats>(
                            statsKey,
                            buildOptimisticStats(
                                fetched,
                                data,
                                isEditingToday,
                                hasYesterdayCheckIn
                            )
                        )
                    }
                })
            }

            return () => {
                rolledBack = true
                queryClient.setQueryData(historyKey14, curHistory)
                queryClient.setQueryData(statsKey, curStats)
                queryClient.setQueryData(checkInsKey14, curCheckIns)
            }
        }

        if (!queryClient.getQueryData(historyKey35)) {
            void queryClient.prefetchQuery({
                queryKey: historyKey35,
                queryFn: () => fetchCheckInHistory(
                    35,
                    dateFnsLocale
                )
            })
        }

        const rollback = applyOptimistic()

        setIsPending(true)
        setIsSubmitted(true)
        router.push(ROUTES.PROGRESS)
        void runSubmit(
            data,
            rollback,
            applyOptimistic
        )
    }

    const value: CheckInContextType = {
        isPending,
        isSubmitted,
        submitCheckIn
    }

    return (
        <CheckInContext.Provider value={value}>
            {children}
        </CheckInContext.Provider>
    )
}

export const useCheckIn = () => {
    const context = useContext(CheckInContext)
    if (!context) {
        throw new Error(
            'useCheckIn must be used within CheckInProvider'
        )
    }
    return context
}
