import { CheckIn } from '@/types/checkIn'

import { checkInTexts } from '@/constants/componentTexts/checkIn'
import { defaults } from '@/constants/defaults'

const { maxSuggestedActivities } = defaults.checkIn

type ActivityCounter = Map<
    string,
    {label: string, count: number}
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

export const getRandomQuote = (): string => {
    const randomIndex = Math.floor(
        Math.random() * checkInTexts.quotes.length
    )
    return checkInTexts.quotes[randomIndex]
}