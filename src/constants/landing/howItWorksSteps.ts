import { landingLocales } from '@/locales/landingLocales'

export const HOW_IT_WORKS_STEPS = [
    {
        stepNumber: 1,
        titleKey: landingLocales.howItWorks.step1Title,
        descKey: landingLocales.howItWorks.step1Desc
    },
    {
        stepNumber: 2,
        titleKey: landingLocales.howItWorks.step2Title,
        descKey: landingLocales.howItWorks.step2Desc
    },
    {
        stepNumber: 3,
        titleKey: landingLocales.howItWorks.step3Title,
        descKey: landingLocales.howItWorks.step3Desc
    }
] as const
