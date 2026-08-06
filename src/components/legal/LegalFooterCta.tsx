import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { ROUTES } from '@/constants/routes'

import { appSettings } from '@/config/appSettings'

import { legalLocales } from '@/locales/legalLocales'

export const LegalFooterCta = () => {
    const t = useTranslations()

    return (
        <div className={'mb-12 mt-6 rounded-2xl border border-border bg-muted p-6'}>
            <p className={'mb-1.5 text-sm font-semibold text-on-surface'}>
                {t(legalLocales.common.footerCta.question)}
            </p>
            <p className={'mb-3.5 text-[13px] leading-relaxed text-muted-foreground'}>
                {t(legalLocales.common.footerCta.description)}
            </p>
            <div className={'flex flex-wrap gap-2.5'}>
                <Button asChild>
                    <Link href={ROUTES.CONTACT_SUPPORT}>
                        {t(legalLocales.common.footerCta.contactSupport)}
                    </Link>
                </Button>
                {appSettings.supportEmail && (
                    <Button
                        asChild
                        variant={'outline'}
                    >
                        <a href={`mailto:${appSettings.supportEmail}`}>
                            {t(legalLocales.common.footerCta.emailLabel, { email: appSettings.supportEmail })}
                        </a>
                    </Button>
                )}
                <Button
                    variant={'outline'}
                    disabled
                >
                    {t(legalLocales.common.footerCta.downloadPdf)}
                </Button>
            </div>
        </div>
    )
}
