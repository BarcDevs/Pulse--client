'use client'

import { useTranslations } from 'next-intl'

import type { SetState } from '@/types/react'

import { Button } from '@/components/ui/button'

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
                        <Button
                            key={suggestion}
                            onClick={() =>
                                onSuggestionClick(suggestion)
                            }
                            variant={'outline'}
                            size={'sm'}
                            className={'rounded-full border border-border bg-surface-card px-3 py-1.5 text-sm text-foreground hover:bg-muted'}
                        >
                            {suggestion}
                        </Button>
                    )
                )}
            </div>
        </div>
    )
}
