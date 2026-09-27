'use client'

import { useTranslations } from 'next-intl'

import type { SetState } from '@/types/react'

import { ChipButton } from '@/components/shared/buttons/ChipButton'

import { chatLocales } from '@/locales/chatLocales'

type ChatSuggestionsPanelProps = {
    onSuggestionClick: SetState<string>
}

export const ChatSuggestionsPanel = ({
    onSuggestionClick
}: ChatSuggestionsPanelProps) => {
    const t = useTranslations()

    const suggestions = [
        t(chatLocales.messages.suggestions[0]),
        t(chatLocales.messages.suggestions[1])
    ]

    return (
        <div className={'mb-3'}>
            <p className={'mb-2 label-uppercase text-muted-foreground'}>
                {t(chatLocales.suggestedForYou)}
            </p>
            <div className={'flex--wrap gap-2'}>
                {suggestions.map(
                    (suggestion) => (
                        <ChipButton
                            key={suggestion}
                            size={'md'}
                            onClick={() =>
                                onSuggestionClick(suggestion)
                            }
                        >
                            {suggestion}
                        </ChipButton>
                    )
                )}
            </div>
        </div>
    )
}
