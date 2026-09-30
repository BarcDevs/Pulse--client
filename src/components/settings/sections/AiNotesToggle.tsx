'use client'

import { useTranslations } from 'next-intl'

import { SettingToggle }
    from '@/components/shared/inputs/SettingToggle'

import { useSettings } from '@/context/SettingsContext'

import { settingsLocales } from '@/locales/settingsLocales'

export const AiNotesToggle = () => {
    const t = useTranslations()
    const { settings, onSettingChange } = useSettings()

    return (
        <SettingToggle
            label={t(settingsLocales.preferences.aiNotes.label)}
            description={t(settingsLocales.preferences.aiNotes.description)}
            checked={settings?.shareNotesWithAI ?? true}
            onChangeAction={(value) =>
                onSettingChange('shareNotesWithAI', value)
            }
        />
    )
}
