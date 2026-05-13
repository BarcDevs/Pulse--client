'use client'

import { useTranslations } from 'next-intl'

import { SettingToggle } from '@/components/shared/inputs/SettingToggle'

import { FEATURES } from '@/config/features'

import { useSettings } from '@/context/SettingsContext'

import { settingsLocales } from '@/locales/settingsLocales'

export const DarkModeToggle = () => {
    const t = useTranslations()
    const { settings, onSettingChange } = useSettings()

    if (!FEATURES.darkMode) return null

    return (
        <SettingToggle
            label={t(settingsLocales.preferences.theme.title)}
            description={t(settingsLocales.preferences.theme.description)}
            checked={settings?.theme === 'dark'}
            onChangeAction={(value) =>
                onSettingChange('theme', value ? 'dark' : 'light')
            }
        />
    )
}
