'use client'

import { DropdownSelector }
    from '@/components/shared/inputs/DropdownSelector'

import {
    languageMap,
    settingsPageTexts
} from '@/constants/componentTexts/settings'

type LanguageSelectorProps = {
    language: string
    onLanguageChangeAction: (language: string) => void
}

export const LanguageSelector = ({
    language,
    onLanguageChangeAction
}: LanguageSelectorProps) => (
    <DropdownSelector
        value={language}
        options={languageMap}
        onChangeAction={onLanguageChangeAction}
        label={settingsPageTexts.preferences.language.title}
        description={settingsPageTexts.preferences.language.description}
    />
)
