import { useTranslations } from 'next-intl'

import {
    AlertCircle,
    RefreshCw
} from 'lucide-react'

import { Button } from '@/components/shared/buttons/Button'

import { startLocales } from '@/locales/startLocales'

type GuestStartErrorProps = {
    onRetryAction: () => void
}

export const GuestStartError = ({
    onRetryAction
}: GuestStartErrorProps) => {
    const t = useTranslations()

    return (
        <div
            role={'alert'}
            className={'flex flex-1 flex-col items-center justify-center gap-2.5 py-10 text-center'}
        >
            <div className={'mb-1.5 flex size-15 items-center justify-center rounded-full bg-muted'}>
                <AlertCircle className={'size-6.5 text-destructive'}/>
            </div>
            <h1 className={'text-xl font-bold text-foreground'}>
                {t(startLocales.errorTitle)}
            </h1>
            <p className={'mb-3 text-base text-muted-foreground'}>
                {t(startLocales.startError)}
            </p>
            <Button
                onClick={onRetryAction}
                className={'min-w-45'}
            >
                <RefreshCw className={'size-4'}/>
                {t(startLocales.retry)}
            </Button>
        </div>
    )
}
