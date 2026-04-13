'use client'

import { Button } from '@/components/ui/button'

import { settingsPageTexts } from '@/constants/componentTexts/settings'

import { useSettings } from '@/context/SettingsContext'

export const SettingsFooter = () => {
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
                {settingsPageTexts.buttons.discardChanges}
            </Button>
            <Button
                disabled={isDisabled}
                onClick={onSave}
            >
                {isSaving
                    ? settingsPageTexts.buttons.savingPreferences
                    : settingsPageTexts.buttons.savePreferences}
            </Button>
        </div>
    )
}