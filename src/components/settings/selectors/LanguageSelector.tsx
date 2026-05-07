'use client'

import { useTranslations } from 'next-intl'

import { DropdownSelector }
    from '@/components/shared/inputs/DropdownSelector'

import languages from '@/data/languages'
import { settingsLocales } from '@/locales/settingsLocales'

type LanguageSelectorProps = {
    language: string
    onLanguageChangeAction: (language: string) => void
}

export const LanguageSelector = ({
    language,
    onLanguageChangeAction
}: LanguageSelectorProps) => {
    const t = useTranslations()

    return (
        <DropdownSelector
            value={language}
            options={Object.fromEntries(
                Object.values(languages).map(lang => [
                    lang.code,
                    lang.nativeName
                ])
            )}
            onChangeAction={onLanguageChangeAction}
            label={t(settingsLocales.preferences.language.title)}
            description={t(settingsLocales.preferences.language.description)}
        />
    )
}
