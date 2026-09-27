import { ROUTES } from '@/constants/routes'
import { SUPPORT_CONTACT_ANCHOR } from '@/constants/support'

import { FEATURES } from '@/config/features'

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
        href: ROUTES.COMMUNITY
    },
    ...(FEATURES.insights
        ? [{
            titleKey: footerLocales.links.quick.insights,
            href: ROUTES.INSIGHTS
        }]
        : [])
]

export const footerSupportLinks = [
    {
        titleKey: footerLocales.links.support.helpCenter,
        href: ROUTES.SUPPORT
    },
    {
        titleKey: footerLocales.links.support.contactUs,
        href: `${ROUTES.SUPPORT}#${SUPPORT_CONTACT_ANCHOR}`
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
    }
]
