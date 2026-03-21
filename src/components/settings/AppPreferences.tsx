'use client'

import { useState } from 'react'

import { Moon, Palette, Sun } from 'lucide-react'

import { cn } from '@/lib/utils'

import {
    SETTINGS_PREFERENCES_LANGUAGE_DESCRIPTION,
    SETTINGS_PREFERENCES_LANGUAGE_OPTIONS,
    SETTINGS_PREFERENCES_LANGUAGE_TITLE,
    SETTINGS_PREFERENCES_THEME_DARK,
    SETTINGS_PREFERENCES_THEME_DESCRIPTION,
    SETTINGS_PREFERENCES_THEME_LIGHT,
    SETTINGS_PREFERENCES_THEME_TITLE,
    SETTINGS_PREFERENCES_TITLE,
} from '@/constants/settingsTexts'

export const AppPreferences = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [language, setLanguage] = useState('en-US')

    return (
        <div className={'rounded-2xl bg-surface-card p-6'}>
            <div className={'flex items-center gap-2 mb-6'}>
                <Palette className={'h-5 w-5 text-primary'} />
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {SETTINGS_PREFERENCES_TITLE}
                </h3>
            </div>

            <div className={'space-y-6'}>
                <div>
                    <h4 className={'font-medium text-foreground mb-1'}>
                        {SETTINGS_PREFERENCES_THEME_TITLE}
                    </h4>
                    <p className={'text-sm text-muted-foreground mb-3'}>
                        {SETTINGS_PREFERENCES_THEME_DESCRIPTION}
                    </p>
                    <div className={'flex gap-2'}>
                        <button
                            onClick={() => setTheme('light')}
                            className={cn(
                                'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
                                theme === 'light'
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-border text-muted-foreground hover:text-foreground'
                            )}
                        >
                            <Sun className={'h-4 w-4'} />
                            {SETTINGS_PREFERENCES_THEME_LIGHT}
                        </button>
                        <button
                            onClick={() => setTheme('dark')}
                            className={cn(
                                'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
                                theme === 'dark'
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-border text-muted-foreground hover:text-foreground'
                            )}
                        >
                            <Moon className={'h-4 w-4'} />
                            {SETTINGS_PREFERENCES_THEME_DARK}
                        </button>
                    </div>
                </div>

                <div>
                    <h4 className={'font-medium text-foreground mb-1'}>
                        {SETTINGS_PREFERENCES_LANGUAGE_TITLE}
                    </h4>
                    <p className={'text-sm text-muted-foreground mb-3'}>
                        {SETTINGS_PREFERENCES_LANGUAGE_DESCRIPTION}
                    </p>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={
                            'w-full max-w-xs px-3 py-2 rounded-lg bg-surface-section border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20'
                        }
                    >
                        {SETTINGS_PREFERENCES_LANGUAGE_OPTIONS.map(
                            (option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>
        </div>
    )
}
