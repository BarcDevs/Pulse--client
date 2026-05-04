'use client'

import { useTranslations } from 'next-intl'

import { DropdownSelector }
    from '@/components/shared/inputs/DropdownSelector'

import { LANGUAGE_OPTIONS } from '@/config/settingsOptions'

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
                LANGUAGE_OPTIONS.map(opt => [opt.value, opt.label])
            )}
            onChangeAction={onLanguageChangeAction}
            label={t(settingsLocales.preferences.language.title)}
            description={t(settingsLocales.preferences.language.description)}
        />
    )
}
