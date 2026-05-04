'use client'

import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'

type MentorItemProps = {
    id: string
    avatar: string
    name: string
    role: string
    online: boolean
}

export const MentorItem = ({
    avatar,
    name,
    role,
    online
}: MentorItemProps) => {
    const t = useTranslations()

    return (
        <div className={'flex items-center justify-between'}>
            <div className={'flex items-center gap-3'}>
                <div className={'relative'}>
                    <div className={'flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-medium text-primary'}>
                        {avatar}
                    </div>
                    {online && (
                        <span className={'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface-card bg-success'}/>
                    )}
                </div>
                <div>
                    <p className={'text-sm font-medium text-foreground'}>
                        {name}
                    </p>
                    <p className={'text-xs text-muted-foreground'}>
                        {role}
                    </p>
                </div>
            </div>
            <Button
                size={'sm'}
                variant={'outline'}
                className={'text-xs'}
            >
                {t('community.mentors.chatButton')}
            </Button>
        </div>
    )
}