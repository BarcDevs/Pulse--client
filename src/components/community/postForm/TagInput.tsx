'use client'

import {
    KeyboardEvent,
    useEffect,
    useRef,
    useState
} from 'react'

import { X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { useForumTags } from '@/hooks/queries/useForumTags'

import config from '@/config/schema/postForm'

import { reportUnknownTag } from '@/api/forum'

type TagInputProps = {
    value: string[]
    onChangeAction: (tags: string[]) => void
    placeholder?: string
}

export const TagInput = ({
    value,
    onChangeAction,
    placeholder
}: TagInputProps) => {
    const [input, setInput] = useState('')
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const { data: availableTags = [] } = useForumTags()

    const query = input.toLowerCase()
    const filtered = availableTags
        .filter(tag => {
            const slug = tag.name.toLowerCase()
            const label = tag.description?.toLowerCase() ?? ''
            return (slug.includes(query) || label.includes(query))
                && !value.includes(slug)
        })
        .slice(0, 8)

    const addTag = (tag: string) => {
        const normalized = tag.toLowerCase().trim()
        if (
            !normalized
            || normalized.length < config.tags.minLength
            || normalized.length > config.tags.maxLength
            || value.includes(normalized)
            || value.length >= config.tags.max
        ) return
        if (!availableTags.some(t => t.name.toLowerCase() === normalized)) {
            // TODO: AI tag normalization — track unknown tags until implemented
            reportUnknownTag(normalized)
        }
        onChangeAction([...value, normalized])
        setInput('')
        setOpen(false)
    }

    const removeTag = (tag: string) => onChangeAction(value.filter(t => t !== tag))

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
            e.preventDefault()
            addTag(input.trim())
        }
        if (e.key === 'Backspace' && !input && value.length > 0)
            removeTag(value[value.length - 1])
    }

    useEffect(() => {
        const onOutside = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', onOutside)
        return () => document.removeEventListener('mousedown', onOutside)
    }, [])

    return (
        <div
            ref={containerRef}
            className={'relative'}
        >
            <div className={'flex flex-wrap gap-1.5 p-2 border border-input rounded-md bg-background min-h-9'}>
                {value.map(tag => (
                    <Badge
                        key={tag}
                        variant={'secondary'}
                        className={'gap-1 pr-1'}
                    >
                        {tag}
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
                ))}
                {value.length < config.tags.max && (
                    <input
                        value={input}
                        onChange={e => {
                            setInput(e.target.value)
                            setOpen(true)
                        }}
                        onFocus={() => setOpen(true)}
                        onKeyDown={handleKeyDown}
                        placeholder={value.length === 0 ? placeholder : ''}
                        className={'flex-1 min-w-[6rem] outline-none text-sm bg-transparent'}
                    />
                )}
            </div>
            {open && filtered.length > 0 && (
                <div className={'absolute z-10 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-md max-h-48 overflow-y-auto'}>
                    {filtered.map(tag => (
                        <Button
                            key={tag.id}
                            type={'button'}
                            variant={'ghost'}
                            onMouseDown={() => addTag(tag.name)}
                            className={'w-full justify-start px-3 py-2 text-sm h-auto rounded-none'}
                        >
                            {tag.name}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    )
}
