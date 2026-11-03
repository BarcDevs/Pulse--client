import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/constants/routes'

import { startLocales } from '@/locales/startLocales'

export const GuestModeNotice = () => {
    const t = useTranslations()

    return (
        <p
            className={'bg-muted px-5 py-2 text-center text-sm text-muted-foreground md:px-12'}
            data-testid={'guest-mode-notice'}
        >
            {t.rich(startLocales.guest.notice, {
                link: (chunks) => (
                    <Link
                        href={ROUTES.LOGIN}
                        className={'font-medium text-primary underline'}
                    >
                        {chunks}
                    </Link>
                )
            })}
        </p>
    )
}
