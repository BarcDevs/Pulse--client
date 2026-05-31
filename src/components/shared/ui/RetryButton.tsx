'use client'

import { useTranslations } from 'next-intl'

import { RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'

type Props = {
    onClick: () => void
}

export const RetryButton = ({ onClick }: Props) => {
    const t = useTranslations()

    return (
        <Button
            variant={'ghost'}
            size={'sm'}
            className={'mt-3 gap-1.5 text-muted-foreground'}
            onClick={onClick}
        >
            <RefreshCw className={'size-3.5'}/>
            {t('common.retry')}
        </Button>
    )
}
