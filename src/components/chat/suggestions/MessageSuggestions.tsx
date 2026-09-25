import { ChipButton } from '@/components/shared/buttons/ChipButton'

type MessageSuggestionsProps = {
    suggestions: string[]
}

export const MessageSuggestions = ({
    suggestions
}: MessageSuggestionsProps) => (
    <div className={'mt-3 flex flex-wrap gap-2'}>
        {suggestions.map((suggestion) => (
            <ChipButton
                key={suggestion}
                isSelected
            >
                {suggestion}
            </ChipButton>
        ))}
    </div>
)
