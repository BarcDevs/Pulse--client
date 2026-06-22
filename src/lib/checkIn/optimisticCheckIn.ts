import type { Locale } from 'date-fns'

import type { QueryClient } from '@tanstack/react-query'

import type {
    CheckIn,
    CheckInStats,
    MoodPainSeriesPoint
} from '@/types/checkIn'

import {
    formatByUserPreference,
    parseDateOnly,
    toDateStr,
    toDateStrInTimezone
} from '@/lib/time'

import { defaults } from '@/constants/defaults'
import { checkInQueryKeys } from '@/constants/queryKeys'

import {
    fetchCheckInHistory,
    fetchCheckIns,
    fetchCheckInStats
} from '@/api/checkIn'
import { CheckInSchema } from '@/validations/forms/checkInSchema'

const RECENT_DAYS = 14
const CHART_DAYS = 35

export const buildCheckInQueryKeys = (dateFnsLocale?: Locale) => ({
    stats: [...checkInQueryKeys.stats, 'weekly'] as const,
    recentHistory: [...checkInQueryKeys.all, 'history', RECENT_DAYS, dateFnsLocale?.code] as const,
    chartHistory: [...checkInQueryKeys.all, 'history', CHART_DAYS, dateFnsLocale?.code] as const,
    recentCheckIns: [...checkInQueryKeys.all, 'list', RECENT_DAYS] as const
})

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

export const applyOptimisticCheckIn = (
    queryClient: QueryClient,
    data: CheckInSchema,
    dateFnsLocale: Locale | undefined,
    timezone: string | undefined
) => {
    const queryKeys = buildCheckInQueryKeys(dateFnsLocale)

    const now = new Date()
    const todayDateStr = toDateStrInTimezone(now, timezone)
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
        const cachedHistory = queryClient
            .getQueryData<MoodPainSeriesPoint[]>(
                queryKeys.recentHistory
            )
        const cachedStats = queryClient
            .getQueryData<CheckInStats>(
                queryKeys.stats
            )
        let rolledBack = false

        const upsertHistory = (
            history: MoodPainSeriesPoint[]
        ) => history.some(p => p.date === newPoint.date)
            ? history.map(p => p.date === newPoint.date ? newPoint : p)
            : [newPoint, ...history]

        const isEditingToday = (cachedHistory ?? [])
            .some(p => p.date === newPoint.date)

        if (cachedHistory) {
            queryClient.setQueryData(
                queryKeys.recentHistory,
                upsertHistory(cachedHistory)
            )
        } else {
            void queryClient.prefetchQuery({
                queryKey: queryKeys.recentHistory,
                queryFn: () =>
                    fetchCheckInHistory(
                        RECENT_DAYS,
                        dateFnsLocale
                    )
            }).then(() => {
                if (rolledBack) return
                const fetched = queryClient.getQueryData<
                    MoodPainSeriesPoint[]
                >(queryKeys.recentHistory)
                if (fetched) {
                    queryClient.setQueryData(
                        queryKeys.recentHistory,
                        upsertHistory(fetched)
                    )
                }
            })
        }

        const cachedCheckIns = queryClient
            .getQueryData<CheckIn[]>(queryKeys.recentCheckIns)

        const hasYesterdayCheckIn = cachedCheckIns
            ? cachedCheckIns.some(
                c => c.checkInDate.slice(0, 10) === yesterdayStr
            )
            : cachedHistory
                ? cachedHistory.some(
                    p => p.originalDate.slice(0, 10) === yesterdayStr
                )
                : undefined

        const upsertCheckIns = (
            checkIns: CheckIn[]
        ) => isEditingToday
            ? checkIns.map(c =>
                c.checkInDate.slice(0, 10) === todayDateStr
                    ? {
                        ...c,
                        ...optimisticCheckIn,
                        id: c.id
                    }
                    : c)
            : [optimisticCheckIn, ...checkIns]

        if (cachedCheckIns) {
            queryClient.setQueryData<CheckIn[]>(
                queryKeys.recentCheckIns,
                upsertCheckIns(cachedCheckIns)
            )
        } else {
            void queryClient.prefetchQuery({
                queryKey: queryKeys.recentCheckIns,
                queryFn: () => fetchCheckIns(RECENT_DAYS)
            }).then(() => {
                if (rolledBack) return
                const fetched = queryClient
                    .getQueryData<CheckIn[]>(queryKeys.recentCheckIns)
                if (fetched) {
                    queryClient.setQueryData<CheckIn[]>(
                        queryKeys.recentCheckIns,
                        upsertCheckIns(fetched)
                    )
                }
            })
        }

        if (cachedStats) {
            queryClient.setQueryData<CheckInStats>(
                queryKeys.stats,
                buildOptimisticStats(
                    cachedStats,
                    data,
                    isEditingToday,
                    hasYesterdayCheckIn
                )
            )
        } else {
            void queryClient.prefetchQuery({
                queryKey: queryKeys.stats,
                queryFn: () => fetchCheckInStats('weekly')
            }).then(() => {
                if (rolledBack) return
                const fetched =
                    queryClient.getQueryData<CheckInStats>(queryKeys.stats)
                if (fetched) {
                    queryClient.setQueryData<CheckInStats>(
                        queryKeys.stats,
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
            queryClient.setQueryData(queryKeys.recentHistory, cachedHistory)
            queryClient.setQueryData(queryKeys.stats, cachedStats)
            queryClient.setQueryData(queryKeys.recentCheckIns, cachedCheckIns)
        }
    }

    if (!queryClient.getQueryData(queryKeys.chartHistory)) {
        void queryClient.prefetchQuery({
            queryKey: queryKeys.chartHistory,
            queryFn: () => fetchCheckInHistory(
                CHART_DAYS,
                dateFnsLocale
            )
        })
    }

    return applyOptimistic
}
