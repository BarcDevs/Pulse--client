import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { ClassName } from '@/types/react'

import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import { ROUTES } from '@/constants/routes'

import { globalLocales } from '@/locales/globalLocales'

type NavAuthLinksProps = {
    mobile?: boolean
    className?: ClassName
}

export const NavAuthLinks = ({
    mobile = false,
    className
}: NavAuthLinksProps) => {
    const t = useTranslations()

    return (
        <div className={cn(mobile ? 'flex flex-col gap-3 w-full' : 'flex items-center gap-3', className)}>
            <LanguageSwitcher/>
            {!mobile && <div className={'h-6 w-px bg-border'}/>}
            <Link
                href={ROUTES.LOGIN}
                className={cn(mobile && 'w-full')}
            >
                <Button
                    variant={'outline'}
                    size={'sm'}
                    className={cn(mobile && 'w-full')}
                >
                    {t(globalLocales.landing.buttons.login)}
                </Button>
            </Link>
            <Link
                href={ROUTES.SIGNUP}
                className={cn(mobile && 'w-full')}
            >
                <Button
                    size={'sm'}
                    className={cn(mobile && 'w-full')}
                >
                    {t(globalLocales.landing.buttons.signUp)}
                </Button>
            </Link>
        </div>
    )
}
