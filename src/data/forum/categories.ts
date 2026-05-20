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
    name: string
    group: CategoryGroup
    color: CategoryColor
}

const categories: Category[] = [
    {
        key: 'recovery',
        name: 'Recovery Journey',
        group: 'Recovery',
        color: {
            bg: '#F3E8FF',
            text: '#7e22ce'
        }
    },
    {
        key: 'therapy',
        name: 'Therapy & Physical Recovery',
        group: 'Recovery',
        color: {
            bg: '#D1FAE5',
            text: '#065f46'
        }
    },
    {
        key: 'milestones',
        name: 'Goals & Progress',
        group: 'Recovery',
        color: {
            bg: '#FEF3C7',
            text: '#a16207'
        }
    },
    {
        key: 'mental',
        name: 'Mental & Emotional Wellbeing',
        group: 'Health',
        color: {
            bg: '#FCE7F3',
            text: '#be185d'
        }
    },
    {
        key: 'lifestyle',
        name: 'Lifestyle & Daily Wellness',
        group: 'Health',
        color: {
            bg: '#E0F2FE',
            text: '#0369a1'
        }
    },
    {
        key: 'support',
        name: 'Community Support',
        group: 'Community',
        color: {
            bg: '#DBEAFE',
            text: '#1d4ed8'
        }
    },
    {
        key: 'questions',
        name: 'Questions & Guidance',
        group: 'Community',
        color: {
            bg: '#FFE4E6',
            text: '#be123c'
        }
    },
    {
        key: 'stories',
        name: 'Recovery Stories',
        group: 'Community',
        color: {
            bg: '#EDE9FE',
            text: '#5b21b6'
        }
    },
    {
        key: 'discussion',
        name: 'Open Discussion',
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
