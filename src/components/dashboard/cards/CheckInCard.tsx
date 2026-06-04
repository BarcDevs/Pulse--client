'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { ArrowRight, ClipboardCheck } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { ROUTES } from '@/constants/routes'

import { dashboardLocales } from '@/locales/dashboardLocales'

export const DashboardCheckInCard = () => {
    const t = useTranslations()

    return (
        <div className={'relative overflow-hidden rounded-2xl bg-linear-to-r from-primary-gradient-start to-primary-gradient-end p-6 text-white'}>
            <div className={'relative z-10'}>
                <Badge className={'mb-4 border-0 bg-white/20 text-white hover:bg-white/30'}>
                    {t(dashboardLocales.checkIn.badge)}
                </Badge>
                <h2 className={'mb-2 text-2xl font-semibold'}>
                    {t(dashboardLocales.checkIn.title)}
                </h2>
                <p className={'mb-6 max-w-md text-white/90'}>
                    {t(dashboardLocales.checkIn.description)}
                </p>
                <Button
                    asChild
                    variant={'outline'}
                    className={'border-white/30 bg-white text-primary hover:bg-white/90 hover:text-primary'}
                >
                    <Link href={ROUTES.CHECK_IN}>
                        {t(dashboardLocales.checkIn.button)}
                        <ArrowRight className={'ml-2 size-4'}/>
                    </Link>
                </Button>
            </div>

            <div className={'absolute -right-4 -bottom-4 opacity-20'}>
                <ClipboardCheck className={'size-48'}/>
            </div>
        </div>
    )
}
