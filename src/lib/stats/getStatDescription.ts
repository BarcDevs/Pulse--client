import { dashboardLocales } from '@/locales/dashboardLocales'

const { stats: statsLocales } = dashboardLocales

type DescriptionResult = {
    key: string
    params?: Record<string, string | number | Date>
}

// TODO: Replace hardcoded stat descriptions with AI-generated insights
export const getStatDescription = (
    statKey: 'MOOD' | 'PAIN' | 'STREAK',
    currentValue: number | undefined,
    longestValue?: number
): DescriptionResult => {
    if (currentValue === undefined)
        return { key: '' }

    switch (statKey) {
        case 'MOOD':
            return {
                key: currentValue >= 7
                    ? statsLocales.descriptions.mood.great
                    : currentValue >= 5
                        ? statsLocales.descriptions.mood.stable
                        : statsLocales.descriptions.mood.low
            }
        case 'PAIN':
            return {
                key: currentValue <= 3
                    ? statsLocales.descriptions.pain.decreasing
                    : currentValue <= 6
                        ? statsLocales.descriptions.pain.elevated
                        : statsLocales.descriptions.pain.high
            }
        case 'STREAK':
            return currentValue === longestValue
                ? { key: statsLocales.descriptions.streak.newRecord }
                : { key: statsLocales.descriptions.streak.personalBest,
                    params: { days: longestValue ?? 0 } }
        default:
            return { key: '' }
    }
}
