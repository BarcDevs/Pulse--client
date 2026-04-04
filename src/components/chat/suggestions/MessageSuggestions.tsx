import { Button } from '@/components/ui/button'

type MessageSuggestionsProps = {
    suggestions: string[]
}

export const MessageSuggestions = ({
    suggestions,
}: MessageSuggestionsProps) => (
    <div className={'mt-3 flex flex-wrap gap-2'}>
        {suggestions.map((suggestion) => (
            <Button
                key={suggestion}
                variant={'outline'}
                size={'sm'}
                className={'h-auto rounded-full border-primary bg-transparent px-3 py-1.5 text-xs text-primary hover:bg-primary-light'}
            >
                {suggestion}
            </Button>
        ))}
    </div>
)
