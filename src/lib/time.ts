import {formatDistance} from 'date-fns'

/**
 * Converts the given date to a relative time format, e.g., "2 hours ago", "in 5 minutes", etc.
 *
 * @param {Date} date - The date to convert to relative time format
 * @return {string} The date in relative time format
 */
export const toRelative = (date: Date): string => {
    return formatDistance(date, new Date(), {
        addSuffix: true
    })
}

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
