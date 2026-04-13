// TODO: Replace hardcoded stat descriptions with AI-generated insights
export const getStatDescription = (
    statKey: 'MOOD' | 'PAIN' | 'STREAK',
    currentValue: number | undefined,
    longestValue?: number
): string => {
    if (currentValue === undefined)
        return ''

    switch (statKey) {
        case 'MOOD':
            return currentValue >= 7
                ? 'Great'
                : currentValue >= 5
                    ? 'Stable'
                    : 'Low'
        case 'PAIN':
            return currentValue <= 3
                ? 'Decreasing'
                : currentValue <= 6
                    ? 'Elevated'
                    : 'High'
        case 'STREAK':
            return currentValue === longestValue
                ? 'New record!'
                : `${longestValue} best`
        default:
            return ''
    }
}
