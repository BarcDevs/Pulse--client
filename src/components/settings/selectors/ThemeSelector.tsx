import { useTranslations } from 'next-intl'

import { Moon, Sun } from 'lucide-react'

import type { Theme } from '@/types'

import { OptionButton } from '@/components/shared/buttons/OptionButton'

import { settingsLocales } from '@/locales/settingsLocales'

type ThemeSelectorProps = {
    theme: Theme
    onThemeChange: (theme: Theme) => void
}

export const ThemeSelector = ({
    theme,
    onThemeChange
}: ThemeSelectorProps) => {
    const t = useTranslations()

    return (
        <div>
            <h4 className={'font-medium text-foreground mb-1'}>
                {t(settingsLocales.preferences.theme.title)}
            </h4>
            <p className={'text-sm text-muted-foreground mb-3'}>
                {t(settingsLocales.preferences.theme.description)}
            </p>
            <div className={'flex gap-2'}>
                <OptionButton
                    layout={'bordered'}
                    isSelected={theme === 'light'}
                    onClick={() => onThemeChange('light')}
                >
                    <Sun className={'h-4 w-4'}/>
                    {t(settingsLocales.preferences.theme.light)}
                </OptionButton>
                <OptionButton
                    layout={'bordered'}
                    isSelected={theme === 'dark'}
                    onClick={() => onThemeChange('dark')}
                >
                    <Moon className={'h-4 w-4'}/>
                    {t(settingsLocales.preferences.theme.dark)}
                </OptionButton>
            </div>
        </div>
    )
}
