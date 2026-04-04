'use client'

import { Palette } from 'lucide-react'

import type { Theme } from '@/types'

import { useAppPreferencesForm }
    from '@/hooks/forms/useAppPreferencesForm'

import { settingsPageTexts } from '@/constants/componentTexts/settings'

import { LanguageSelector } from '../selectors/LanguageSelector'
import { ThemeSelector } from '../selectors/ThemeSelector'

type AppPreferencesProps = {
    theme?: Theme
    language?: string
}

export const AppPreferences = ({
    theme = 'light',
    language = 'en-US'
}: AppPreferencesProps) => {
    const { form } = useAppPreferencesForm({
        theme,
        language
    })

    const currentTheme = form.watch('theme')
    const currentLanguage = form.watch('language')

    const handleThemeChange = (value: string) =>
        form.setValue('theme', value as any)

    const handleLanguageChange = (value: string) =>
        form.setValue('language', value)

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center gap-2 mb-6'}>
                <Palette className={'h-5 w-5 text-primary'}/>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {settingsPageTexts.preferences.title}
                </h3>
            </div>

            <div className={'space-y-6'}>
                <ThemeSelector
                    theme={currentTheme}
                    onThemeChange={handleThemeChange}
                />
                <LanguageSelector
                    language={currentLanguage}
                    onLanguageChange={handleLanguageChange}
                />
            </div>
        </div>
    )
}
