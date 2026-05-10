'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { footerQuickLinks } from '@/constants/footerLinks'

import { globalLocales } from '@/locales/globalLocales'

export const FooterLinks = () => {
    const t = useTranslations()

    return (
        <div>
            <h3 className={'font-semibold mb-4'}>
                {t(globalLocales.footer.quickLinksTitle)}
            </h3>
            <ul className={'space-y-2'}>
                {footerQuickLinks.map(link => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={'text-sm text-muted-foreground hover:text-foreground transition-colors'}
                        >
                            {t(link.titleKey)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
