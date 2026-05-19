'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Headphones } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { globalLocales } from '@/locales/globalLocales'

export const SidebarBottomError = () => {
    const router = useRouter()
    const t = useTranslations()

    const handleGetSupport = () =>
        router.push('/contact-support')

    return (
        <div className={'border-t border-border px-4 py-4'}>
            <Button
                onClick={handleGetSupport}
                className={'w-full gap-3'}
            >
                <Headphones className={'size-4'}/>
                <span className={'text-sm'}>
                    {t(globalLocales.errors.errorPage.getSupport)}
                </span>
            </Button>
        </div>
    )
}
