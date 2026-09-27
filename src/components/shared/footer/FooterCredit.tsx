'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { appSettings } from '@/config/appSettings'

import { globalLocales } from '@/locales/globalLocales'

export const FooterCredit = () => {
    const t = useTranslations()

    return (
        <p className={'text-sm text-muted-foreground'}>
            {`${t(globalLocales.footer.copyright, {
                brandName: appSettings.brandName
            })} | `}
            <Link
                href={'mailto:bar@bardevs.com'}
                className={'underline underline-offset-2 hover:text-foreground transition-colors'}
            >
                {'bardevs'}
            </Link>
        </p>
    )
}
