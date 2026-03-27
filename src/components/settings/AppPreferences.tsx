'use client'

import {Palette} from 'lucide-react'

import type {Theme} from '@/types'

import {useAppPreferencesForm}
    from '@/hooks/forms/useAppPreferencesForm'

import {settingsPageTexts} from '@/constants/componentTexts/settings'

import {LanguageSelector} from './LanguageSelector'
import {ThemeSelector} from './ThemeSelector'

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
                    onThemeChange={
                        (value) => form.setValue(
                            'theme',
                            value
                        )
                    }
                />
                <LanguageSelector
                    language={currentLanguage}
                    onLanguageChange={
                        (value) => form.setValue(
                            'language',
                            value
                        )
                    }
                />
            </div>
        </div>
    )
}
