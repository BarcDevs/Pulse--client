export const CHART_DAYS = [
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN'
]

export const WEEKLY_CHART_DATA = [
    {
        date: 'Dec 1',
        actual: 6,
        target: 7
    },
    {
        date: 'Dec 2',
        actual: 4,
        target: 7
    },
    {
        date: 'Dec 3',
        actual: 8,
        target: 7
    },
    {
        date: 'Dec 4',
        actual: 7,
        target: 7
    },
    {
        date: 'Dec 5',
        actual: 5,
        target: 7
    },
    {
        date: 'Dec 6',
        actual: 9,
        target: 7
    },
    {
        date: 'Dec 7',
        actual: 7,
        target: 7
    }
]

export const PATTERNS_SOCIAL_DATA = [
    { day: 'Mon', value: 4 },
    { day: 'Tue', value: 6 },
    { day: 'Wed', value: 3 },
    { day: 'Thu', value: 7 },
    { day: 'Fri', value: 5 }
]

export const WEEKLY_CHART_VALUES = [6, 5, 7, 9, 6, 7, 8]

export const WEEKLY_CHART_DATA_DERIVED =
    CHART_DAYS.map((day, index) => ({
        day,
        value: WEEKLY_CHART_VALUES[index]
    }))
