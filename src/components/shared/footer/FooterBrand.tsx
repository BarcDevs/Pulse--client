'use client'

import { useTranslations } from 'next-intl'

import { globalLocales } from '@/locales/globalLocales'

import { Logo } from '../brand/Logo'

export const FooterBrand = () => {
    const t = useTranslations()

    return (
        <div>
            <Logo/>
            <p className={'text-sm text-muted-foreground mt-4'}>
                {t(globalLocales.footer.brandTagline)}
            </p>
        </div>
    )
}
