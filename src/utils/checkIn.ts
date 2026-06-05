import { CheckIn } from '@/types/checkIn'

import { defaults } from '@/constants/defaults'

const { maxSuggestedActivities } = defaults.checkIn

type ActivityCounter = Map<
    string,
    { label: string, count: number }
>

export const aggregateActivities =
    (checkIns: CheckIn[]): string[] => {
        const counter: ActivityCounter = new Map()

        for (const checkIn of checkIns) {
            for (const activity of checkIn.activities) {
                const normalized = activity
                    .toLowerCase()
                    .trim()

                if (!normalized) continue

                const existing = counter.get(normalized)
                if (existing) {
                    existing.count++
                } else {
                    counter.set(normalized, {
                        label: activity,
                        count: 1
                    })
                }
            }
        }

        return Array.from(counter.values())
            .sort((a, b) => b.count - a.count)
            .slice(0, maxSuggestedActivities)
            .map(item => item.label)
    }

export const pickQuote = (
    quotes: string[],
    locale: string
) => {
    const seed = `${locale}-${new Date().toDateString()}`
    const index = [...seed].reduce((acc, c) =>
        acc + c.charCodeAt(0), 0) % quotes.length
    return quotes[index]
}