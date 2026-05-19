'use client'

import { useTranslations } from 'next-intl'

import {
    Lock,
    Shield,
    UserX
} from 'lucide-react'

import { GuidelineItem } from '@/components/shared/content/GuidelineItem'
import { Button } from '@/components/ui/button'

import { communityLocales } from '@/locales/communityLocales'

export const SanctuaryCard = () => {
    const t = useTranslations()

    return (
        <div className={'rounded-2xl border border-primary/20 bg-primary/5 p-5'}>
            <h3 className={'mb-2 font-semibold text-foreground'}>
                {t('community.sanctuary.title')}
            </h3>
            <p className={'mb-4 text-sm text-muted-foreground'}>
                {t('community.sanctuary.description')}
            </p>
            <div className={'space-y-2'}>
                <GuidelineItem
                    icon={Shield}
                    label={t(communityLocales.sanctuary.rules.kind)}
                />
                <GuidelineItem
                    icon={Lock}
                    label={t(communityLocales.sanctuary.rules.noAdvice)}
                />
                <GuidelineItem
                    icon={UserX}
                    label={t(communityLocales.sanctuary.rules.privacy)}
                />
            </div>
            <Button
                variant={'outline'}
                size={'sm'}
                className={'mt-4 w-full'}
            >
                {/* todo: add real community guidelines */}
                {t('community.sanctuary.readGuidelines')}
            </Button>
        </div>
    )
}