'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/shared/buttons/Button'

import { useLogout } from '@/hooks/mutations/useLogout'

import { ROUTES } from '@/constants/routes'

import { profileLocales } from '@/locales/profileLocales'

export const SystemPrivacy = () => {
    const t = useTranslations()
    const logout = useLogout()

    return (
        <div className={'card-base'}>
            <h3 className={'text-lg font-semibold text-foreground mb-6'}>
                {t(profileLocales.systemPrivacy.title)}
            </h3>

            <div className={'flex gap-3'}>
                <Button
                    asChild
                    variant={'secondary'}
                >
                    <Link href={ROUTES.PROFILE_SETTINGS}>
                        {t(profileLocales.systemPrivacy.manageSettings)}
                    </Link>
                </Button>

                <Button
                    variant={'secondary'}
                    onClick={() => logout.actions.logout()}
                    disabled={logout.status.isPending}
                >
                    {t(profileLocales.systemPrivacy.signOut)}
                </Button>
            </div>
        </div>
    )
}
