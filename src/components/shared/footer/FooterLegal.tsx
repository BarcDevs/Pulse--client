'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { footerLegalLinks } from '@/constants/footerLinks'

import { globalLocales } from '@/locales/globalLocales'

export const FooterLegal = () => {
    const t = useTranslations()

    return (
        <div>
            <h3 className={'font-semibold mb-4'}>
                {t(globalLocales.footer.legalTitle)}
            </h3>
            <ul className={'space-y-2'}>
                {footerLegalLinks.map(link => (
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
