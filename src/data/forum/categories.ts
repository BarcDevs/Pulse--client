export const CATEGORY_GROUP = {
    InjuryTypes: 'Injury Types',
    Rehabilitation: 'Rehabilitation',
    MentalHealth: 'Mental Health',
    PeerSupport: 'Peer Support'
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
        key: 'fractures',
        name: 'Fractures',
        group: 'Injury Types'
    },
    {
        key: 'spinals',
        name: 'Spinal Cord Injuries',
        group: 'Injury Types'
    },
    {
        key: 'brain',
        name: 'Traumatic Brain Injuries',
        group: 'Injury Types'
    },
    {
        key: 'musculoskeletal',
        name: 'Musculoskeletal Injuries',
        group: 'Injury Types'
    },
    {
        key: 'internal',
        name: 'Internal Injuries',
        group: 'Injury Types'
    },
    {
        key: 'burn',
        name: 'Burn Injuries',
        group: 'Injury Types'
    },
    {
        key: 'other-injuries',
        name: 'Other Specific Injuries',
        group: 'Injury Types'
    },
    {
        key: 'physical',
        name: 'Physical Therapy',
        group: 'Rehabilitation'
    },
    {
        key: 'occupational',
        name: 'Occupational Therapy',
        group: 'Rehabilitation'
    },
    {
        key: 'speech',
        name: 'Speech Therapy',
        group: 'Rehabilitation'
    },
    {
        key: 'mobility',
        name: 'Mobility Aids and Devices',
        group: 'Rehabilitation'
    },
    {
        key: 'assistive',
        name: 'Assistive Technologies',
        group: 'Rehabilitation'
    },
    {
        key: 'exercises',
        name: 'Rehabilitation Exercises',
        group: 'Rehabilitation'
    },
    {
        key: 'milestones',
        name: 'Recovery Milestones',
        group: 'Rehabilitation'
    },
    {
        key: 'coping',
        name: 'Coping Strategies',
        group: 'Mental Health'
    },
    {
        key: 'emotional',
        name: 'Emotional Support',
        group: 'Mental Health'
    },
    {
        key: 'stress',
        name: 'Stress Management',
        group: 'Mental Health'
    },
    {
        key: 'anxiety',
        name: 'Anxiety and Depression',
        group: 'Mental Health'
    },
    {
        key: 'mindfulness',
        name: 'Mindfulness and Meditation',
        group: 'Mental Health'
    },
    {
        key: 'therapeutic',
        name: 'Therapeutic Techniques',
        group: 'Mental Health'
    },
    {
        key: 'self-care',
        name: 'Self-Care Practices',
        group: 'Mental Health'
    },
    {
        key: 'introduction',
        name: 'Introduction and Community Guidelines',
        group: 'Peer Support'
    },
    {
        key: 'success',
        name: 'Success Stories',
        group: 'Peer Support'
    },
    {
        key: 'personal',
        name: 'Personal Experiences',
        group: 'Peer Support'
    },
    {
        key: 'q&a',
        name: 'Q&A and Advice',
        group: 'Peer Support'
    },
    {
        key: 'support',
        name: 'Support Groups',
        group: 'Peer Support'
    },
    {
        key: 'motivational',
        name: 'Motivational Posts',
        group: 'Peer Support'
    },
    {
        key: 'discussion',
        name: 'General Discussion',
        group: 'Peer Support'
    }
]

const toGrouped = (categories: Category[]) => Object.groupBy(categories, ({ group }) => group)

export const groupedCategories = toGrouped(categories)
export const getCategory = (key: string) => categories.find(category => category.key === key)
export default categories

