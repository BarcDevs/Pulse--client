import { Send } from 'lucide-react'
import type { KeyboardEvent } from 'react'

import type { SetState } from '@/types/react'

import { FormInput } from '@/components/shared/inputs/FormInput'
import { UserAvatar } from '@/components/shared/UserAvatar'
import { Button } from '@/components/ui/button'

import { chatTexts } from '@/constants/componentTexts/chat'

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
}: ChatInputFieldProps) => (
    <div className={'flex items-center gap-3'}>
        <UserAvatar initials={'AR'}/>

        <div className={'relative flex-1'}>
            <FormInput
                id={'chatInput'}
                type={'text'}
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                onKeyDown={onKeyDown}
                placeholder={chatTexts.inputPlaceholder}
                className={'w-full rounded-full border border-border bg-muted px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'}
                required={false}
            />
            <Button
                onClick={onSend}
                size={'icon'}
                className={'absolute right-1.5 top-1/2 size-8 -translate-y-1/2 rounded-full bg-primary hover:bg-primary/90'}
            >
                <Send className={'size-4 text-white'}/>
            </Button>
        </div>
    </div>
)
