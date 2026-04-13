'use client'

import { Icon } from '@/components/shared/ui/Icon'
import { Button } from '@/components/ui/button'

import { redirectToGoogleAuth } from '@/lib/auth'

import { authTexts } from '@/constants/componentTexts/auth'

export const GoogleLoginButton = () => {
    const handleClick = async () => {
        await redirectToGoogleAuth()
    }

    return (
        <>
            <div className={'relative my-6'}>
                <div className={'absolute inset-0 flex--center'}>
                    <div className={'w-full border-t'}/>
                </div>
                <div className={'relative flex justify-center text-xs uppercase'}>
                    <p className={'bg-background px-2 text-muted-foreground'}>
                        {authTexts.common.orContinueWith}
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
                {authTexts.common.continueWithGoogle}
            </Button>
        </>
    )
}
