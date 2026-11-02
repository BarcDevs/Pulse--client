'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { ROUTES } from '@/constants/routes'

import { startLocales } from '@/locales/startLocales'

export type SaveErrorKind = 'emailTaken' | 'failed'

type SaveErrorMessageProps = {
    kind: SaveErrorKind
}

export const SaveErrorMessage = ({
    kind
}: SaveErrorMessageProps) => {
    const t = useTranslations()

    if (kind === 'failed') return t(startLocales.save.error)

    return t.rich(startLocales.save.emailTaken, {
        link: (chunks) => (
            <Link
                href={ROUTES.LOGIN}
                className={'font-medium underline'}
            >
                {chunks}
            </Link>
        )
    })
}
