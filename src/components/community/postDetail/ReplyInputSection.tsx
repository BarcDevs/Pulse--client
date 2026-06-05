'use client'

import { useTranslations } from 'next-intl'

import { MessageSquare } from 'lucide-react'

import { UserAvatar } from '@/components/shared/UserAvatar'
import { Button } from '@/components/ui/button'

import { getUserFallback } from '@/lib/utils'

import { useAuth } from '@/context/AuthContext'

import { communityLocales } from '@/locales/communityLocales'

type ReplyInputSectionProps = {
    onOpenAction: () => void
}

export const ReplyInputSection = ({
    onOpenAction
}: ReplyInputSectionProps) => {
    const t = useTranslations()
    const { user } = useAuth()
    const initials = user
        ? getUserFallback(user.firstName, user.lastName)
        : ''

    return (
        <Button
            type={'button'}
            variant={'outline'}
            onClick={onOpenAction}
            className={'flex items-center gap-3 w-full h-auto p-3 rounded-xl border border-border hover:border-primary hover:bg-primary-light/30 transition-colors text-start cursor-pointer'}
        >
            <UserAvatar initials={initials}/>
            <span className={'flex-1 text-sm text-muted-foreground'}>
                {t(communityLocales.postDetail.writeReplyPlaceholder)}
            </span>
            <span className={'inline-flex items-center gap-1.5 shrink-0 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] text-white text-sm font-semibold'}>
                <MessageSquare className={'h-3.5 w-3.5'}/>
                {t(communityLocales.postActions.reply)}
            </span>
        </Button>
    )
}
