import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { Button } from '@/components/ui/button'

import { ROUTES } from '@/constants/routes'

import { globalLocales } from '@/locales/globalLocales'

export const NavAuthLinks = () => {
    const t = useTranslations()

    return (
        <div className={'flex items-center gap-3'}>
            <LanguageSwitcher/>
            <div className={'h-6 w-px bg-border'}/>
            <Link href={ROUTES.LOGIN}>
                <Button
                    variant={'outline'}
                    size={'sm'}
                >
                    {t(globalLocales.landing.buttons.login)}
                </Button>
            </Link>
            <Link href={ROUTES.SIGNUP}>
                <Button size={'sm'}>
                    {t(globalLocales.landing.buttons.signUp)}
                </Button>
            </Link>
        </div>
    )
}
