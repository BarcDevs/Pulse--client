'use client'

import {useRouter} from 'next/navigation'

import {RotateCcw} from 'lucide-react'

import Icon from '@/components/shared/ui/Icon'
import {Button} from '@/components/ui/button'

import {ERROR_PAGE} from '@/constants/errorMessages'

type ErrorActionsProps = {
    resetAction: () => void
}

export const ErrorActions = ({
    resetAction
}: ErrorActionsProps) => {
    const router = useRouter()

    const handleContactSupport = () => {
        router.push('/contact-support')
    }

    return (
        <div className={'mt-8 flex flex-col sm:flex-row items-center gap-3 w-full justify-center'}>
            <Button
                onClick={resetAction}
                className={'gap-2'}
            >
                <RotateCcw className={'w-4 h-4'}/>
                {ERROR_PAGE.tryRefreshingBtn}
            </Button>
            <Button
                onClick={handleContactSupport}
                variant={'outline'}
            >
                <Icon
                    name={'error/support-agent'}
                    size={20}
                />
                {ERROR_PAGE.contactSupportBtn}
            </Button>
        </div>
    )
}
