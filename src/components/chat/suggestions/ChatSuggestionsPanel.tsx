import type { SetState } from '@/types/react'

import { Button } from '@/components/ui/button'

import { chatTexts } from '@/constants/componentTexts/chat'

type ChatSuggestionsPanelProps = {
    onSuggestionClick: SetState<string>
}

export const ChatSuggestionsPanel = ({
    onSuggestionClick
}: ChatSuggestionsPanelProps) => (
    <div className={'mb-3'}>
        <p className={'mb-2 label-uppercase text-muted-foreground'}>
            {chatTexts.suggestedForYou}
        </p>
        <div className={'flex--wrap gap-2'}>
            {chatTexts.messages.suggestions.map(
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
