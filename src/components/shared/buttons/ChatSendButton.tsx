import { ComponentProps } from 'react'

import { Send } from 'lucide-react'

import { Button } from '@/components/shared/buttons/Button'

import { cn } from '@/lib/utils'

type ChatSendButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size' | 'children'>

export const ChatSendButton = ({
    className,
    ...props
}: ChatSendButtonProps) => (
    <Button
        className={cn(
            'size-8 rounded-full p-0',
            className
        )}
        {...props}
    >
        <Send className={'size-4'}/>
    </Button>
)
