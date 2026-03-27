import {Moon, Sun} from 'lucide-react'

import type {Theme} from '@/types'

import {Button} from '@/components/ui/button'

import {cn} from '@/lib/utils'

import * as SettingsTexts from '@/constants/settingsTexts'

type ThemeSelectorProps = {
    theme: Theme
    onThemeChange: (theme: Theme) => void
}

export const ThemeSelector = ({
    theme,
    onThemeChange
}: ThemeSelectorProps) => (
    <div>
        <h4 className={'font-medium text-foreground mb-1'}>
            {SettingsTexts.SETTINGS_PREFERENCES_THEME_TITLE}
        </h4>
        <p className={'text-sm text-muted-foreground mb-3'}>
            {SettingsTexts.SETTINGS_PREFERENCES_THEME_DESCRIPTION}
        </p>
        <div className={'flex gap-2'}>
            <Button
                onClick={() => onThemeChange('light')}
                variant={
                    theme === 'light'
                        ? 'default'
                        : 'outline'
                }
                className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg',
                    theme === 'light'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border text-muted-foreground hover:text-foreground'
                )}
            >
                <Sun className={'h-4 w-4'}/>
                {SettingsTexts.SETTINGS_PREFERENCES_THEME_LIGHT}
            </Button>
            <Button
                onClick={() => onThemeChange('dark')}
                variant={
                    theme === 'dark'
                        ? 'default'
                        : 'outline'
                }
                className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg',
                    theme === 'dark'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border text-muted-foreground hover:text-foreground'
                )}
            >
                <Moon className={'h-4 w-4'}/>
                {SettingsTexts.SETTINGS_PREFERENCES_THEME_DARK}
            </Button>
        </div>
    </div>
)
