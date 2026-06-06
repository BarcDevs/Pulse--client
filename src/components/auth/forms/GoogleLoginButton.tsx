'use client'

import { useTranslations } from 'next-intl'

import { Icon } from '@/components/shared/ui/Icon'
import { Button } from '@/components/ui/button'

import { redirectToGoogleAuth } from '@/lib/auth'

import { authLocales } from '@/locales/authLocales'

type Props = {
    redirect?: string | null
}

export const GoogleLoginButton = ({ redirect }: Props) => {
    const t = useTranslations()

    const handleClick = async () => {
        await redirectToGoogleAuth(redirect)
    }

    return (
        <>
            <div className={'relative my-6'}>
                <div className={'absolute inset-0 flex--center'}>
                    <div className={'w-full border-t'}/>
                </div>
                <div className={'relative flex justify-center text-xs uppercase'}>
                    <p className={'bg-background px-2 text-muted-foreground'}>
                        {t(authLocales.common.orContinueWith)}
                    </p>
                </div>
            </div>

            <Button
                type={'button'}
                variant={'outline'}
                className={'h-11 w-full mb-6'}
                onClick={handleClick}
            >
                <Icon
                    name={'social/google'}
                    size={20}
                    className={'mr-2'}
                />
                {t(authLocales.common.continueWithGoogle)}
            </Button>
        </>
    )
}
