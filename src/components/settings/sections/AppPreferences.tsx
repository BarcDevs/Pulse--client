'use client'

import { useTranslations } from 'next-intl'

import { Palette } from 'lucide-react'

import { settingsLocales } from '@/locales/settingsLocales'

import { DarkModeToggle } from './DarkModeToggle'
import { LanguageSelector } from './LanguageSelector'

export const AppPreferences = () => {
    const t = useTranslations()

    return (
        <div className={'card-base'}>
            <div className={'flex items-center gap-2 mb-6'}>
                <Palette className={'h-5 w-5 text-primary'}/>
                <h3 className={'text-lg font-semibold text-foreground'}>
                    {t(settingsLocales.preferences.title)}
                </h3>
            </div>

            <div className={'space-y-6'}>
                <DarkModeToggle/>
                <LanguageSelector/>
            </div>
        </div>
    )
}
