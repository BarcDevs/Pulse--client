import {
    Activity,
    Apple,
    Star,
    Users
} from 'lucide-react'

import { COMMUNITY_CATEGORIES } from '@/mocks/communityCategories'

export const communityCategoriesIconMap = {
    'Support Groups': Users,
    'Success Stories': Star,
    'Nutrition': Apple,
    'Yoga & Movement': Activity
}

export const communityCategoriesColorMap:
    Record<string, string> = {
    'Support Groups': 'bg-blue-50 text-primary',
    'Success Stories': 'bg-purple-50 text-accent',
    Nutrition: 'bg-orange-50 text-warning',
    'Yoga & Movement': 'bg-emerald-50 text-secondary'
}

export const communityCategoriesWithIcons =
    COMMUNITY_CATEGORIES.map((cat) => ({
        ...cat,
        icon:
            communityCategoriesIconMap[
                cat.title as
                    keyof typeof communityCategoriesIconMap
                ],
        color:
            communityCategoriesColorMap[
                cat.title as
                    keyof typeof communityCategoriesColorMap
                ]
    }))
