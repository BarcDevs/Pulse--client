'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Headphones } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { ROUTES } from '@/constants/routes'

import { globalLocales } from '@/locales/globalLocales'

export const SidebarBottomError = () => {
    const t = useTranslations()

    return (
        <div className={'border-t border-border px-4 py-4'}>
            <Button
                asChild
                className={'w-full gap-3'}
            >
                <Link href={ROUTES.CONTACT_SUPPORT}>
                    <Headphones className={'size-4'}/>
                    <span className={'text-sm'}>
                        {t(globalLocales.errors.errorPage.getSupport)}
                    </span>
                </Link>
            </Button>
        </div>
    )
}
