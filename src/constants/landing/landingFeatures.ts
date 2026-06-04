import {
    CalendarCheck,
    Sparkles,
    Users
} from 'lucide-react'

import { landingLocales } from '@/locales/landingLocales'

export const LANDING_FEATURES = [
    {
        icon: CalendarCheck,
        titleKey: landingLocales.features.card1Title,
        descKey: landingLocales.features.card1Desc,
        iconClassName: 'text-primary bg-primary-light'
    },
    {
        icon: Sparkles,
        titleKey: landingLocales.features.card2Title,
        descKey: landingLocales.features.card2Desc,
        iconClassName: 'text-accent-ai bg-accent-ai-light'
    },
    {
        icon: Users,
        titleKey: landingLocales.features.card3Title,
        descKey: landingLocales.features.card3Desc,
        iconClassName: 'text-secondary bg-secondary-light'
    }
] as const
