import {Button} from '@/components/ui/button'

import {
    CHAT_SUGGESTED_FOR_YOU,
    CHAT_SUGGESTIONS
} from '@/constants/chatTexts'

type ChatSuggestionsPanelProps = {
    onSuggestionClick: (suggestion: string) => void
}

export const ChatSuggestionsPanel = ({
    onSuggestionClick
}: ChatSuggestionsPanelProps) => (
    <div className={'mb-3'}>
        <p className={'mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground'}>
            {CHAT_SUGGESTED_FOR_YOU}
        </p>
        <div className={'flex flex-wrap gap-2'}>
            {CHAT_SUGGESTIONS.map(
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
