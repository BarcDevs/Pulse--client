'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

import { useSettings } from '@/context/SettingsContext'

import { settingsLocales } from '@/locales/settingsLocales'

export const SettingsFooter = () => {
    const t = useTranslations()
    const {
        hasChanges,
        isSaving,
        onSave,
        onDiscard
    } = useSettings()

    const isDisabled = !hasChanges || isSaving

    return (
        <div className={'flex items-center justify-end gap-3 pt-4 border-t border-border'}>
            <Button
                variant={'outline'}
                disabled={isDisabled}
                onClick={onDiscard}
            >
                {t(settingsLocales.buttons.discardChanges)}
            </Button>
            <Button
                disabled={isDisabled}
                onClick={onSave}
            >
                {isSaving
                    ? t(settingsLocales.buttons.savingPreferences)
                    : t(settingsLocales.buttons.savePreferences)}
            </Button>
        </div>
    )
}