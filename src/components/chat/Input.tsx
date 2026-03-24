'use client'

import {KeyboardEvent} from 'react'

import {Send} from 'lucide-react'

import {FormInput} from '@/components/shared/FormInput'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'
import {Button} from '@/components/ui/button'

import {
    CHAT_INPUT_PLACEHOLDER,
    CHAT_SUGGESTED_FOR_YOU,
    CHAT_SUGGESTIONS,
} from '@/constants/chatTexts'

type ChatInputProps = {
    value: string
    onChange: (value: string) => void
    onSend: () => void
}

const ChatInput = ({value, onChange, onSend}: ChatInputProps) => {
    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSend()
        }
    }

    return (
        <div
            className={'border-t border-border bg-surface-card p-4'}
        >
            <div className={'mx-auto max-w-3xl'}>
                <div className={'mb-3'}>
                    <p
                        className={'mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground'}
                    >
                        {CHAT_SUGGESTED_FOR_YOU}
                    </p>
                    <div
                        className={'flex flex-wrap gap-2'}
                    >
                        {CHAT_SUGGESTIONS.map(
                            (suggestion) => (
                                <Button
                                    key={suggestion}
                                    onClick={() =>
                                        onChange(suggestion)
                                    }
                                    variant={'outline'}
                                    size={'sm'}
                                    className={'rounded-full border border-border bg-surface-card px-3 py-1.5 text-sm text-foreground hover:bg-muted'}
                                >
                                    {suggestion}
                                </Button>
                            ),
                        )}
                    </div>
                </div>

                <div
                    className={'flex items-center gap-3'}
                >
                    <Avatar
                        className={'size-9 shrink-0'}
                    >
                        <AvatarImage
                            src={'/avatars/alex.jpg'}
                        />
                        <AvatarFallback
                            className={'bg-primary-light text-primary'}
                        >
                            AR
                        </AvatarFallback>
                    </Avatar>
                    <div
                        className={'relative flex-1'}
                    >
                        <FormInput
                            id={'chatInput'}
                            type={'text'}
                            value={value}
                            onChange={(e) =>
                                onChange(e.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            placeholder={
                                CHAT_INPUT_PLACEHOLDER
                            }
                            className={'w-full rounded-full border border-border bg-muted px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'}
                            required={false}
                        />
                        <Button
                            onClick={onSend}
                            size={'icon'}
                            className={'absolute right-1.5 top-1/2 size-8 -translate-y-1/2 rounded-full bg-primary hover:bg-primary/90'}
                        >
                            <Send
                                className={
                                    'size-4 text-white'
                                }
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {ChatInput}
