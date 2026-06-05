import { useTranslations } from 'next-intl'

import { Moon, Sun } from 'lucide-react'

import type { Theme } from '@/types'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

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
                <Button
                    onClick={() => onThemeChange('light')}
                    variant={theme === 'light'
                        ? 'default'
                        : 'outline'}
                    className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg',
                        theme === 'light'
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border text-muted-foreground hover:text-foreground'
                    )}
                >
                    <Sun className={'h-4 w-4'}/>
                    {t(settingsLocales.preferences.theme.light)}
                </Button>
                <Button
                    onClick={() => onThemeChange('dark')}
                    variant={theme === 'dark'
                        ? 'default'
                        : 'outline'}
                    className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-lg',
                        theme === 'dark'
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border text-muted-foreground hover:text-foreground'
                    )}
                >
                    <Moon className={'h-4 w-4'}/>
                    {t(settingsLocales.preferences.theme.dark)}
                </Button>
            </div>
        </div>
    )
}
