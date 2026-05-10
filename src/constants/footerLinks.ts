import { globalLocales } from '@/locales/globalLocales'

const { footer: footerLocales } = globalLocales

export const footerQuickLinks = [
    {
        titleKey: footerLocales.links.quick.dailyCheckIn,
        href: '/check-in'
    },
    {
        titleKey: footerLocales.links.quick.progress,
        href: '/progress'
    },
    {
        titleKey: footerLocales.links.quick.communityForum,
        href: '/forum'
    },
    {
        titleKey: footerLocales.links.quick.insights,
        href: '/insights'
    }
]

export const footerLegalLinks = [
    {
        titleKey: footerLocales.links.legal.privacyPolicy,
        href: '/privacy'
    },
    {
        titleKey: footerLocales.links.legal.termsOfService,
        href: '/terms'
    },
    {
        titleKey: footerLocales.links.legal.cookiePolicy,
        href: '/cookies'
    }
]
