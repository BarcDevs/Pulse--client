import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/shared/buttons/Button'
import { Icon } from '@/components/shared/ui/Icon'

import { ROUTES } from '@/constants/routes'

import { authLocales } from '@/locales/authLocales'

export const GoogleSignupLink = () => {
    const t = useTranslations()

    return (
        <Button
            asChild
            variant={'secondary'}
            size={'xl'}
            className={'w-full'}
        >
            <Link href={ROUTES.SIGNUP}>
                <Icon
                    name={'social/google'}
                    size={20}
                    className={'mr-2'}
                />
                {t(authLocales.common.continueWithGoogle)}
            </Link>
        </Button>
    )
}
