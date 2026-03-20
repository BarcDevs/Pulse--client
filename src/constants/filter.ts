export const Filter = {
    newest: 'newest',
    popular: 'popular',
    hot: 'hot',
    unanswered: 'unanswered'
} as const

export type FilterType = keyof typeof Filter
