export const CATEGORY_GROUP = {
    Recovery: 'Recovery',
    Health: 'Health',
    Community: 'Community'
} as const

export type CategoryGroup =
    typeof CATEGORY_GROUP[keyof typeof CATEGORY_GROUP]

type CategoryColor = {
    bg: string
    text: string
}

type Category = {
    key: string
    group: CategoryGroup
    color: CategoryColor
}

const categories: Category[] = [
    {
        key: 'recovery',
        group: 'Recovery',
        color: {
            bg: '#F3E8FF',
            text: '#7e22ce'
        }
    },
    {
        key: 'therapy',
        group: 'Recovery',
        color: {
            bg: '#D1FAE5',
            text: '#065f46'
        }
    },
    {
        key: 'milestones',
        group: 'Recovery',
        color: {
            bg: '#FEF3C7',
            text: '#a16207'
        }
    },
    {
        key: 'mental',
        group: 'Health',
        color: {
            bg: '#FCE7F3',
            text: '#be185d'
        }
    },
    {
        key: 'lifestyle',
        group: 'Health',
        color: {
            bg: '#E0F2FE',
            text: '#0369a1'
        }
    },
    {
        key: 'support',
        group: 'Community',
        color: {
            bg: '#DBEAFE',
            text: '#1d4ed8'
        }
    },
    {
        key: 'questions',
        group: 'Community',
        color: {
            bg: '#FFE4E6',
            text: '#be123c'
        }
    },
    {
        key: 'stories',
        group: 'Community',
        color: {
            bg: '#EDE9FE',
            text: '#5b21b6'
        }
    },
    {
        key: 'wellness',
        group: 'Health',
        color: {
            bg: '#CCFBF1',
            text: '#0f766e'
        }
    },
    {
        key: 'discussion',
        group: 'Community',
        color: {
            bg: '#E2E8F0',
            text: '#334155'
        }
    }
]

const toGrouped = (
    categories: Category[]
) => Object.groupBy(categories, ({ group }) => group)

export const groupedCategories = toGrouped(categories)
export const getCategory = (
    key: string
) => categories.find(category => category.key === key)
export default categories
