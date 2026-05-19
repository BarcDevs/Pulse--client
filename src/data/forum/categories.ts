export const CATEGORY_GROUP = {
    Recovery: 'Recovery',
    Health: 'Health',
    Community: 'Community'
} as const

export type CategoryGroup =
    typeof CATEGORY_GROUP[keyof typeof CATEGORY_GROUP]

type Category = {
    key: string
    name: string
    group: CategoryGroup
}

const categories: Category[] = [
    {
        key: 'recovery',
        name: 'Recovery Journey',
        group: 'Recovery'
    },
    {
        key: 'therapy',
        name: 'Therapy & Physical Recovery',
        group: 'Recovery'
    },
    {
        key: 'milestones',
        name: 'Goals & Progress',
        group: 'Recovery'
    },
    {
        key: 'mental',
        name: 'Mental & Emotional Wellbeing',
        group: 'Health'
    },
    {
        key: 'lifestyle',
        name: 'Lifestyle & Daily Wellness',
        group: 'Health'
    },
    {
        key: 'support',
        name: 'Community Support',
        group: 'Community'
    },
    {
        key: 'questions',
        name: 'Questions & Guidance',
        group: 'Community'
    },
    {
        key: 'stories',
        name: 'Recovery Stories',
        group: 'Community'
    },
    {
        key: 'discussion',
        name: 'Open Discussion',
        group: 'Community'
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
