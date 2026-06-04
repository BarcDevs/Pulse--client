import { ROUTES } from '@/constants/routes'

import { globalLocales } from '@/locales/globalLocales'

const { footer: footerLocales } = globalLocales

export const footerQuickLinks = [
    {
        titleKey: footerLocales.links.quick.dailyCheckIn,
        href: ROUTES.CHECK_IN
    },
    {
        titleKey: footerLocales.links.quick.progress,
        href: ROUTES.PROGRESS
    },
    {
        titleKey: footerLocales.links.quick.communityForum,
        href: ROUTES.FORUM
    },
    {
        titleKey: footerLocales.links.quick.insights,
        href: ROUTES.INSIGHTS
    }
]

export const footerLegalLinks = [
    {
        titleKey: footerLocales.links.legal.privacyPolicy,
        href: ROUTES.PRIVACY
    },
    {
        titleKey: footerLocales.links.legal.termsOfService,
        href: ROUTES.TERMS
    },
    {
        titleKey: footerLocales.links.legal.cookiePolicy,
        href: ROUTES.COOKIES
    }
]
