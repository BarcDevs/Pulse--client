import { useTranslations } from 'next-intl'

import { Button } from '@/components/shared/buttons/Button'

import { startLocales } from '@/locales/startLocales'

type GuestSaveBarProps = {
    disabled: boolean
    onSaveAction: () => void
}

export const GuestSaveBar = ({
    disabled,
    onSaveAction
}: GuestSaveBarProps) => {
    const t = useTranslations()

    return (
        <div className={'sticky bottom-0 mt-auto grid gap-1.5 border-t border-border bg-card px-4 pt-3 pb-5 text-center shadow-[0_-4px_16px_rgb(26_43_60/0.05)] md:hidden'}>
            <Button
                size={'lg'}
                disabled={disabled}
                onClick={onSaveAction}
                className={'w-full'}
                data-testid={'guest-save-open-mobile'}
            >
                {t(startLocales.result.saveButton)}
            </Button>
            <small className={'text-xs text-muted-foreground'}>
                {t(startLocales.result.saveNote)}
            </small>
        </div>
    )
}
