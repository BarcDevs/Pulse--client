'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Icon } from '@/components/shared/ui/Icon'

import { appSettings } from '@/config/appSettings'

import { globalLocales } from '@/locales/globalLocales'

export const NetworkErrorSupport = () => {
    const t = useTranslations()

    return (
        <div className={'mt-12 p-6 bg-surface-container-lowest/60 backdrop-blur-md rounded-xl border border-outline-variant/20 inline-block'}>
            <div className={'flex items-center gap-3 text-sm font-medium'}>
                <Icon
                    name={'error/support-agent'}
                    size={20}
                    className={'text-primary'}
                />
                <span className={'text-foreground'}>
                    {`${t(globalLocales.errors.networkErrorPage.supportMessage)} `}
                    {appSettings.supportPhoneNumber && (
                        <Link
                            href={`tel:${appSettings.supportPhoneNumber}`}
                            className={'text-primary font-bold hover:underline'}
                        >
                            {appSettings.supportPhoneNumber}
                        </Link>
                    )}
                </span>
            </div>
        </div>
    )
}
