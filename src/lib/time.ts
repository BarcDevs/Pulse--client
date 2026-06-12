import type { Locale } from 'date-fns'
import {
    format,
    formatDistance
} from 'date-fns'

/**
 * Converts the given date to a relative time format, e.g., "2 hours ago", "in 5 minutes", etc.
 *
 * @return {string} The date in relative time format
 */
export const toDateStr = (d: Date): string =>
    format(d, 'yyyy-MM-dd')

export const getTodayMidnight = (): Date => {
    const today = new Date()

    today.setHours(0, 0, 0, 0)
    return today
}

export const parseDateOnly = (isoDate: string): Date => {
    const [year, month, day] = isoDate.slice(0, 10).split('-').map(Number)
    return new Date(year, month - 1, day)
}

export const isDateStringTodayOrFuture = (
    date: string
): boolean => {
    const [year, month, day] = date.split('-').map(Number)
    const parsed = new Date(year, month - 1, day)
    return parsed >= getTodayMidnight()
}

export const getMsUntilMidnight = (): number => {
    const now = new Date()
    const midnight = new Date(now)

    midnight.setHours(24, 0, 0, 0)
    return midnight.getTime() - now.getTime()
}

export const toRelative = (
    date: Date,
    locale?: Locale
): string =>
    formatDistance(date, new Date(), {
        addSuffix: true,
        locale
    })

/**
 * Converts a number to a short string representation with K, M, or B suffix.
 *
 * @param {number} num - the number to be converted
 * @return {string} the short string representation of the number
 */
export const toShortNumber = (num: number): string => {
    if (num >= 1000000000) {
        return `${(num / 1000000000).toFixed(1)}B`
    } else if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`
    } else {
        return num.toString()
    }
}

/**
 * Formats a date according to the user's preferred date format.
 *
 * @param {Date} date - The date to format
 * @param {boolean} short - If true, removes year from format
 * @param {string | undefined} dateFormat - The user's preferred date format (if undefined, defaults to 'dd/MM/yyyy')
 * @return {string} The formatted date
 */
export const formatByUserPreference = (
    date: Date,
    short: boolean = false,
    dateFormat?: string,
    locale?: Locale
): string => {
    if (!date || isNaN(date.getTime()))
        return 'Invalid Date'

    let formatString = (dateFormat ?? 'dd/MM/yyyy')
        .replace(/(?<![hH])mm(?!m)/g, 'MM')

    if (short) {
        formatString = formatString
            .replace(', yyyy', '')
            .replace('/yyyy', '')
    }
    return format(
        date,
        formatString,
        locale ? { locale } : undefined
    )
}
