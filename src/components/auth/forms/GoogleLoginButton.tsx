'use client'

import {Icon} from '@/components/shared/ui/Icon'
import {Button} from '@/components/ui/button'

import {AUTH_COMMON} from '@/constants/authTexts'

import {redirectToGoogleAuth} from '@/handlers/auth'

export const GoogleLoginButton = () => {
    const handleClick = async () => {
        await redirectToGoogleAuth()
    }

    return (
        <>
            <div className={'relative'}>
                <div className={'absolute inset-0 flex items-center'}>
                    <div className={'w-full border-t'}/>
                </div>
                <div className={'relative flex justify-center text-xs uppercase my-4'}>
                    <p className={'bg-background px-2 text-muted-foreground'}>
                        {AUTH_COMMON.orContinueWith}
                    </p>
                </div>
            </div>

            <Button
                type={'button'}
                variant={'outline'}
                className={'h-11 w-full'}
                onClick={handleClick}
            >
                <Icon
                    name={'social/google'}
                    className={'size-5 mr-2'}
                    size={5}
                />
                {AUTH_COMMON.continueWithGoogle}
            </Button>
        </>
    )
}
