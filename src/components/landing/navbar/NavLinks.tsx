import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

import { ROUTES } from '@/constants/routes'

import { landingLocales } from '@/locales/landingLocales'

type NavLinksProps = {
    mobile?: boolean
    onLinkClickAction?: () => void
}

export const NavLinks = ({
    mobile = false,
    onLinkClickAction
}: NavLinksProps) => {
    const t = useTranslations()
    const linkCn = 'text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground'

    return (
        <nav className={cn(mobile ? 'flex flex-col gap-5' : 'hidden items-center gap-7 md:flex')}>
            <Link
                href={'#how-it-works'}
                className={linkCn}
                onClick={onLinkClickAction}
            >
                {t(landingLocales.nav.howItWorks)}
            </Link>
            <Link
                href={ROUTES.COMMUNITY}
                className={linkCn}
                onClick={onLinkClickAction}
            >
                {t(landingLocales.nav.community)}
            </Link>
            <Link
                href={'#about'}
                className={linkCn}
                onClick={onLinkClickAction}
            >
                {t(landingLocales.nav.about)}
            </Link>
        </nav>
    )
}
