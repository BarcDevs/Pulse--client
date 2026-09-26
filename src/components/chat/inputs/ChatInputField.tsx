'use client'

import { useTranslations } from 'next-intl'

import type { KeyboardEvent } from 'react'

import type { SetState } from '@/types/react'

import { UserAvatar } from '@/components/shared/avatars/UserAvatar'
import { ChatSendButton } from '@/components/shared/buttons/ChatSendButton'
import { Input } from '@/components/shared/inputs/Input'

import { chatLocales } from '@/locales/chatLocales'

type ChatInputFieldProps = {
    value: string
    onChange: SetState<string>
    onSend: () => void
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
}

export const ChatInputField = ({
    value,
    onChange,
    onSend,
    onKeyDown
}: ChatInputFieldProps) => {
    const t = useTranslations()

    return (
        <div className={'flex items-center gap-3'}>
            <UserAvatar initials={'AR'}/>

            <div className={'relative flex-1'}>
                <Input
                    id={'chatInput'}
                    type={'text'}
                    variant={'chat'}
                    className={'pr-12'}
                    value={value}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    onKeyDown={onKeyDown}
                    placeholder={t(chatLocales.inputPlaceholder)}
                />
                <ChatSendButton
                    onClick={onSend}
                    className={'absolute right-1.5 top-1/2 -translate-y-1/2'}
                />
            </div>
        </div>
    )
}
