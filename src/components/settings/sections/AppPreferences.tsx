'use client'

import { Palette } from 'lucide-react'

import {
    DEFAULT_LANGUAGE,
    settingsPageTexts
} from '@/constants/componentTexts/settings'

import { useSettings } from '@/context/SettingsContext'

import { LanguageSelector } from '../selectors/LanguageSelector'

export const AppPreferences = () => {
    const { settings, onSettingChange } = useSettings()

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center gap-2 mb-6'}>
                <Palette className={'h-5 w-5 text-primary'}/>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {settingsPageTexts.preferences.title}
                </h3>
            </div>

            <div className={'space-y-6'}>
                {/* todo: add theme toggle */}
                {/*<ThemeSelector*/}
                {/*    theme={(settings?.theme as any) || 'light'}*/}
                {/*    onThemeChange={(value) =>*/}
                {/*        onSettingChange('theme', value)*/}
                {/*    }*/}
                {/*/>*/}
                <LanguageSelector
                    language={settings?.language || DEFAULT_LANGUAGE}
                    onLanguageChangeAction={(value) =>
                        onSettingChange('language', value)
                    }
                />
            </div>
        </div>
    )
}
