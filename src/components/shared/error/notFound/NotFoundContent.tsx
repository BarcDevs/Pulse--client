'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Home } from 'lucide-react'

import { Icon } from '@/components/shared/ui/Icon'
import { Button } from '@/components/ui/button'

import { ROUTES } from '@/constants/routes'

import { globalLocales } from '@/locales/globalLocales'

type NotFoundContentProps = {
    onGoBackAction: () => void
}

export const NotFoundContent = ({
    onGoBackAction
}: NotFoundContentProps) => {
    const t = useTranslations()

    return (
        <div className={'text-center md:text-start order-2 md:order-1'}>
            <div className={'inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-semibold tracking-wider mb-6'}>
                <Icon
                    name={'error/map'}
                    size={16}
                />
                {t(globalLocales.errors.notFoundPage.badgeLabel)}
            </div>

            <h1 className={'font-headline text-4xl md:text-6xl font-extrabold text-on-surface mb-6 leading-tight tracking-tight'}>
                {t(globalLocales.errors.notFoundPage.mainHeading)}
            </h1>

            <p className={'font-body text-on-surface-variant text-base md:text-lg md:max-w-md mb-10 leading-relaxed'}>
                {t(globalLocales.errors.notFoundPage.description)}
            </p>

            <div className={'flex flex-col sm:flex-row items-center gap-4'}>
                <Button asChild>
                    <Link href={ROUTES.DASHBOARD}>
                        <Home className={'w-5 h-5'}/>
                        {t(globalLocales.errors.notFoundPage.returnDashboardBtn)}
                    </Link>
                </Button>
                <Button
                    onClick={onGoBackAction}
                    variant={'outline'}
                >
                    <Icon
                        name={'error/arrow-back'}
                        size={20}
                    />
                    {t(globalLocales.errors.notFoundPage.previousPageBtn)}
                </Button>
            </div>
        </div>
    )
}
