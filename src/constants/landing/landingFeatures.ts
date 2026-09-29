import {
    ClipboardCheck,
    HeartHandshake,
    LineChart
} from 'lucide-react'

import { landingLocales } from '@/locales/landingLocales'

export const LANDING_FEATURES = [
    {
        icon: ClipboardCheck,
        titleKey: landingLocales.features.card1Title,
        descKey: landingLocales.features.card1Desc,
        iconClassName: 'text-primary bg-primary-light'
    },
    {
        icon: LineChart,
        titleKey: landingLocales.features.card2Title,
        descKey: landingLocales.features.card2Desc,
        iconClassName: 'text-accent-ai bg-accent-ai-light'
    },
    {
        icon: HeartHandshake,
        titleKey: landingLocales.features.card3Title,
        descKey: landingLocales.features.card3Desc,
        iconClassName: 'text-secondary bg-secondary-light'
    }
] as const
