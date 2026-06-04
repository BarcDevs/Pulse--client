import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/constants/routes'

import { landingLocales } from '@/locales/landingLocales'

export const NavLinks = () => {
    const t = useTranslations()

    return (
        <nav className={'hidden items-center gap-7 md:flex'}>
            <Link
                href={'#how-it-works'}
                className={'text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground'}
            >
                {t(landingLocales.nav.howItWorks)}
            </Link>
            <Link
                href={ROUTES.COMMUNITY}
                className={'text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground'}
            >
                {t(landingLocales.nav.community)}
            </Link>
            <Link
                href={'#about'}
                className={'text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground'}
            >
                {t(landingLocales.nav.about)}
            </Link>
        </nav>
    )
}
