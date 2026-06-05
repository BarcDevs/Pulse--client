'use client'

import {
    KeyboardEvent,
    useState
} from 'react'

import { useLocale, useTranslations } from 'next-intl'

import { X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { useForumTags } from '@/hooks/queries/useForumTags'

import { getTagName } from '@/utils/tag'

import config from '@/config/schema/postForm'

import { reportUnknownTag } from '@/api/forum'
import { communityLocales } from '@/locales/communityLocales'

type TagInputProps = {
    value: string[]
    onChangeAction: (tags: string[]) => void
    onBlurAction?: () => void
    placeholder?: string
    error?: string
}

export const TagInput = ({
    value,
    onChangeAction,
    onBlurAction,
    placeholder,
    error
}: TagInputProps) => {
    const [input, setInput] = useState('')
    const t = useTranslations()
    const locale = useLocale()
    const lang = locale.split('-')[0] as 'en' | 'he'
    const { data } = useForumTags({
        filter: 'popular',
        limit: 20
    })
    const availableTags = data ?? []

    const query = input.toLowerCase().trim()
    const suggestions = availableTags
        .filter(tag =>
            (!query || tag.slug.includes(query) 
                || tag.label?.[lang]?.toLowerCase()
                    .includes(query))
            && !value.includes(tag.slug)
        )
        .slice(0, 6)

    const addTag = (slug: string) => {
        const normalized = slug.toLowerCase().trim()
        if (
            !normalized
            || value.includes(normalized)
            || value.length >= config.tags.max
        ) return
        const match = availableTags.find(t =>
            t.slug === normalized
            || t.label?.[lang]?.toLowerCase() === normalized
            || t.label?.en?.toLowerCase() === normalized
        )
        if (!match) {
            reportUnknownTag(normalized)
            return
        }
        if (value.includes(match.slug)) return
        onChangeAction([...value, match.slug])
        setInput('')
    }

    const removeTag = (tag: string) => 
        onChangeAction(value.filter(t => t !== tag))

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter' || e.key === ',') 
            && input.trim()) {
            e.preventDefault()
            addTag(input.trim())
        }
        if (e.key === 'Backspace' && !input && value.length > 0)
            removeTag(value[value.length - 1])
    }

    const showSuggestions = value.length 
        < config.tags.max && suggestions.length > 0
    const suggestionsLabel = query
        ? t(communityLocales.postForm.tagSuggestions)
        : t(communityLocales.postForm.tagPopularTopics)

    return (
        <div className={'space-y-2'}>
            <div
                aria-invalid={!!error}
                className={'tag-input-box flex flex-wrap gap-1.5 p-2 border border-input rounded-md bg-background min-h-9'}
            >
                {value.map(tag => {
                    const found = availableTags
                        .find(t => t.slug === tag)
                    const displayName = found
                        ? getTagName(found, lang) : tag
                    return (
                    <Badge
                        key={tag}
                        className={'gap-1 pr-1 bg-primary-light text-primary hover:bg-primary-light'}
                    >
                        {displayName}
                        <Button
                            type={'button'}
                            variant={'ghost'}
                            onClick={() => removeTag(tag)}
                            aria-label={`Remove tag ${tag}`}
                            className={'h-4 w-4 p-0 text-muted-foreground hover:text-foreground'}
                        >
                            <X className={'h-3 w-3'}/>
                        </Button>
                    </Badge>
                    )
                })}
                {value.length < config.tags.max && (
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onBlur={onBlurAction}
                        onKeyDown={handleKeyDown}
                        placeholder={value.length === 0
                            ? placeholder
                            : t(communityLocales.postForm.tagsPlaceholderMore)}
                        className={'flex-1 min-w-24 outline-none text-sm bg-transparent'}
                    />
                )}
            </div>
            {error && (
                <p className={'text-xs text-destructive'}>
                    {error}
                </p>
            )}
            {showSuggestions && (
                <div>
                    <p className={'text-xs text-muted-foreground mb-1.5'}>
                        {suggestionsLabel}
                    </p>
                    <div className={'flex flex-wrap gap-1.5'}>
                        {suggestions.map(tag => (
                            <Button
                                key={tag.id}
                                type={'button'}
                                variant={'outline'}
                                onClick={() => addTag(tag.slug)}
                                className={'h-auto px-3 py-1 rounded-full text-xs text-muted-foreground hover:text-foreground hover:border-primary'}
                            >
                                {`+ ${getTagName(tag, lang)}`}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
