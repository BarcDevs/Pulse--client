'use client'

import { useTranslations } from 'next-intl'

import { RefreshCw } from 'lucide-react'

import { TextButton } from '@/components/shared/buttons/TextButton'

type Props = {
    onClick: () => void
}

export const RetryButton = ({ onClick }: Props) => {
    const t = useTranslations()

    return (
        <TextButton
            tone={'muted'}
            className={'mt-3 gap-1.5'}
            onClick={onClick}
        >
            <RefreshCw className={'size-3.5'}/>
            {t('common.retry')}
        </TextButton>
    )
}
