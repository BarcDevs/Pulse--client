'use client'

import {useState} from 'react'

import {Palette} from 'lucide-react'

import type {Theme} from '@/types'

import * as SettingsTexts from '@/constants/settingsTexts'

import {LanguageSelector} from './LanguageSelector'
import {ThemeSelector} from './ThemeSelector'

export const AppPreferences = () => {
    const [theme, setTheme] = useState<Theme>('light')
    const [language, setLanguage] = useState('en-US')

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center gap-2 mb-6'}>
                <Palette className={'h-5 w-5 text-primary'}/>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {SettingsTexts.SETTINGS_PREFERENCES_TITLE}
                </h3>
            </div>

            <div className={'space-y-6'}>
                <ThemeSelector
                    theme={theme}
                    onThemeChange={setTheme}
                />
                <LanguageSelector
                    language={language}
                    onLanguageChange={setLanguage}
                />
            </div>
        </div>
    )
}
