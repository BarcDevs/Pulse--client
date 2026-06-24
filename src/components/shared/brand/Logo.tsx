'use client'

import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/constants/routes'

import { appSettings } from '@/config/appSettings'

import { useAuth } from '@/context/AuthContext'

const BRAND_NAME = appSettings.brandName

export const Logo = ({}) => {
    const { user } = useAuth()

    return (
        <Link
            href={user ? ROUTES.DASHBOARD : ROUTES.HOME}
            className={'flex items-center gap-2'}
        >
            <div className={'flex size-10 items-center justify-center rounded-xl'}>
                <Image
                    src={'/logos/PulseLogoNoCaption.webp'}
                    alt={`${BRAND_NAME} Logo`}
                    width={40}
                    height={40}
                    className={'w-10 h-10 rounded-lg object-contain'}
                />
            </div>

            <span className={'font-(family-name:--font-heading) text-xl font-semibold text-logo'}>
                {BRAND_NAME}
            </span>
        </Link>
    )
}
