'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { RotateCcw } from 'lucide-react'

import { Icon } from '@/components/shared/ui/Icon'
import { Button } from '@/components/ui/button'

import { ROUTES } from '@/constants/routes'

import { globalLocales } from '@/locales/globalLocales'

type ErrorActionsProps = {
    resetAction: () => void
}

export const ErrorActions = ({
    resetAction
}: ErrorActionsProps) => {
    const t = useTranslations()

    return (
        <div className={'mt-8 flex flex-col sm:flex-row items-center gap-3 w-full justify-center'}>
            <Button
                onClick={resetAction}
                className={'gap-2'}
            >
                <RotateCcw className={'w-4 h-4'}/>
                {t(globalLocales.errors.errorPage.tryRefreshingBtn)}
            </Button>
            <Button
                asChild
                variant={'outline'}
            >
                <Link href={ROUTES.CONTACT_SUPPORT}>
                    <Icon
                        name={'error/support-agent'}
                        size={20}
                    />
                    {t(globalLocales.errors.errorPage.contactSupportBtn)}
                </Link>
            </Button>
        </div>
    )
}
