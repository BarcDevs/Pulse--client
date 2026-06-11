import type { CheckIn } from '@/types/checkIn'

import { getTodayMidnight, toDateStr } from '@/lib/time'

type StreakBarsProps = {
    checkIns: CheckIn[]
    currentStreak: number
}

const getBarColor = (
    date: string,
    checkInDates: Set<string>,
    streakStartStr: string,
    isActive: boolean
) => {
    if (!checkInDates.has(date))
        return 'var(--border)'
    if (isActive && date >= streakStartStr)
        return 'var(--streak-active)'
    return 'var(--streak-past)'
}

export const StreakBars = ({
    checkIns,
    currentStreak
}: StreakBarsProps) => {
    const today = getTodayMidnight()

    const dates = Array.from(
        { length: 14 },
        (_, i) => {
            const d = new Date(today)
            d.setDate(today.getDate() - (13 - i))
            return toDateStr(d)
        }
    )

    const checkInDates = new Set(checkIns
        .map(c => c.checkInDate.slice(0, 10)))

    const streakStart = new Date(today)
    streakStart.setDate(today.getDate()
        - Math.max(currentStreak - 1, 0))
    const streakStartStr =
        currentStreak > 0 ? toDateStr(streakStart) : ''

    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    const yesterdayStr = toDateStr(yesterday)
    const isActive = currentStreak > 0
        && (streakStartStr > yesterdayStr || checkInDates.has(yesterdayStr))

    return (
        <div className={'flex items-end gap-1'}>
            {dates.map(date => (
                <div
                    key={date}
                    className={'flex-1 rounded-sm h-6'}
                    style={{
                        backgroundColor: getBarColor(
                            date,
                            checkInDates,
                            streakStartStr,
                            isActive
                        )
                    }}
                />
            ))}
        </div>
    )
}
