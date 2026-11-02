import { ReactNode } from 'react'

import Image from 'next/image'

import { appSettings } from '@/config/appSettings'

type GuestHeaderProps = {
    children?: ReactNode
}

export const GuestHeader = ({
    children
}: GuestHeaderProps) => (
    <header className={'flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-5 md:h-16 md:px-12'}>
        <div className={'flex items-center gap-2'}>
            <Image
                src={'/logos/PulseLogoNoCaption.webp'}
                alt={''}
                width={30}
                height={30}
                className={'size-7.5 object-contain'}
            />
            <span className={'font-(family-name:--font-heading) text-lg font-extrabold tracking-tight text-logo'}>
                {appSettings.brandName}
            </span>
        </div>
        {children}
    </header>
)
