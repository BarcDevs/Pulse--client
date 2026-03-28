import {Icon} from '@/components/shared/ui/Icon'
import {Button} from '@/components/ui/button'

import {authTexts} from '@/constants/componentTexts/auth'

export const LoginOAuthSection = () => (
    <>
        <div className={'relative'}>
            <div className={'absolute inset-0 flex items-center'}>
                <span className={'w-full border-t border-border'}/>
            </div>
            <div className={'relative flex justify-center text-xs uppercase'}>
                <span className={'bg-card px-2 text-muted-foreground'}>
                    {authTexts.login.orContinueWith}
                </span>
            </div>
        </div>

        <Button
            type={'button'}
            variant={'outline'}
            className={'h-11 w-full border-border'}
        >
            <Icon
                name={'social/google'}
                size={20}
                className={'mr-2'}
            />
            {authTexts.login.googleButton}
        </Button>
    </>
)
