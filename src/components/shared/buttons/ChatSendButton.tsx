import { ComponentProps } from 'react'

import { useTranslations } from 'next-intl'

import { Send } from 'lucide-react'

import { Button } from '@/components/shared/buttons/Button'

import { cn } from '@/lib/utils'

import { globalLocales } from '@/locales/globalLocales'

type ChatSendButtonProps = Omit<ComponentProps<typeof Button>, 'variant' | 'size' | 'children'>

export const ChatSendButton = ({
    className,
    ...props
}: ChatSendButtonProps) => {
    const t = useTranslations()

    return (
        <Button
            aria-label={t(globalLocales.a11y.sendMessage)}
            className={cn(
                'size-8 rounded-full p-0',
                className
            )}
            {...props}
        >
            <Send className={'size-4'}/>
        </Button>
    )
}
