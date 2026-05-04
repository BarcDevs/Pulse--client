'use client'

import { useTranslations } from 'next-intl'

import {
    Lock,
    Shield,
    UserX
} from 'lucide-react'

import { GuidelineItem } from '@/components/shared/content/GuidelineItem'
import { Button } from '@/components/ui/button'

import { COMMUNITY_SANCTUARY_RULES } from '@/mocks/communityData'

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
                    label={COMMUNITY_SANCTUARY_RULES[0]}
                />
                <GuidelineItem
                    icon={Lock}
                    label={COMMUNITY_SANCTUARY_RULES[1]}
                />
                <GuidelineItem
                    icon={UserX}
                    label={COMMUNITY_SANCTUARY_RULES[2]}
                />
            </div>
            <Button
                variant={'outline'}
                size={'sm'}
                className={'mt-4 w-full'}
            >
                {/* todo: add community guidelines */}
                {t('community.sanctuary.readGuidelines')}
            </Button>
        </div>
    )
}