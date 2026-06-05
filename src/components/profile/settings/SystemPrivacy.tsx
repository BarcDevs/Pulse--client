'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button, buttonVariants } from '@/components/ui/button'

import { useLogout } from '@/hooks/mutations/useLogout'

import { ROUTES } from '@/constants/routes'

import { profileLocales } from '@/locales/profileLocales'

export const SystemPrivacy = () => {
    const t = useTranslations()
    const { logout, isPending } = useLogout()

    return (
        <div className={'card-base'}>
            <h3 className={'text-lg font-semibold text-foreground mb-6'}>
                {t(profileLocales.systemPrivacy.title)}
            </h3>

            <div className={'flex gap-3'}>
                <Link
                    href={ROUTES.PROFILE_SETTINGS}
                    className={buttonVariants({ variant: 'outline' })}
                >
                    {t(profileLocales.systemPrivacy.manageSettings)}
                </Link>

                <Button
                    variant={'outline'}
                    className={'border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive'}
                    onClick={() => logout()}
                    disabled={isPending}
                >
                    {t(profileLocales.systemPrivacy.signOut)}
                </Button>
            </div>
        </div>
    )
}
