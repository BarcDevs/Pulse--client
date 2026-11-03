import { useTranslations } from 'next-intl'

import { Button } from '@/components/shared/buttons/Button'
import { Icon } from '@/components/shared/ui/Icon'

import { redirectToGoogleAuth } from '@/lib/auth'

import { authLocales } from '@/locales/authLocales'

export const GoogleSignupButton = () => {
    const t = useTranslations()

    return (
        <Button
            type={'button'}
            variant={'secondary'}
            size={'xl'}
            className={'w-full'}
            onClick={() => redirectToGoogleAuth()}
            data-testid={'guest-google'}
        >
            <Icon
                name={'social/google'}
                size={20}
                className={'mr-2'}
            />
            {t(authLocales.common.continueWithGoogle)}
        </Button>
    )
}
