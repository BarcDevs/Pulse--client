import {
    Activity,
    Apple,
    Star,
    Users
} from 'lucide-react'

import { COMMUNITY_CATEGORIES } from '@/constants/communityTexts'

export const COMMUNITY_CATEGORIES_ICON_MAP = {
    'Support Groups': Users,
    'Success Stories': Star,
    'Nutrition': Apple,
    'Yoga & Movement': Activity,
}

export const COMMUNITY_CATEGORIES_COLOR_MAP = {
    'Support Groups': 'bg-blue-50 text-primary',
    'Success Stories': 'bg-purple-50 text-accent',
    'Nutrition': 'bg-orange-50 text-warning',
    'Yoga & Movement': 'bg-emerald-50 text-secondary',
}

export const COMMUNITY_CATEGORIES_WITH_ICONS =
    COMMUNITY_CATEGORIES.map((cat) => ({
        ...cat,
        icon:
            COMMUNITY_CATEGORIES_ICON_MAP[
                cat.title as
                    keyof typeof COMMUNITY_CATEGORIES_ICON_MAP
            ],
        color:
            COMMUNITY_CATEGORIES_COLOR_MAP[
                cat.title as
                    keyof typeof COMMUNITY_CATEGORIES_COLOR_MAP
            ],
    }))
