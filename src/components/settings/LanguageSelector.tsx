import * as SettingsTexts from '@/constants/settingsTexts'

type LanguageSelectorProps = {
    language: string
    onLanguageChange: (language: string) => void
}

export const LanguageSelector = ({
    language,
    onLanguageChange
}: LanguageSelectorProps) => (
    <div>
        <h4 className={'font-medium text-foreground mb-1'}>
            {SettingsTexts.SETTINGS_PREFERENCES_LANGUAGE_TITLE}
        </h4>
        <p className={'text-sm text-muted-foreground mb-3'}>
            {SettingsTexts.SETTINGS_PREFERENCES_LANGUAGE_DESCRIPTION}
        </p>
        <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className={'w-full max-w-xs px-3 py-2 rounded-lg bg-surface-section border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20'}
        >
            {SettingsTexts.SETTINGS_PREFERENCES_LANGUAGE_OPTIONS.map(
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
)
