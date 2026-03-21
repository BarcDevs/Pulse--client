'use client'

import { Lock, Shield, UserX } from 'lucide-react'

import { GuidelineItem } from '@/components/shared/GuidelineItem'
import { Button } from '@/components/ui/button'

import * as communityTexts from '@/constants/communityTexts'

export const SanctuaryCard = () => (
    <div className={'rounded-2xl border border-primary/20 bg-primary/5 p-5'}>
        <h3 className={'mb-2 font-semibold text-foreground'}>
            {communityTexts.COMMUNITY_SANCTUARY_TITLE}
        </h3>
        <p className={'mb-4 text-sm text-muted-foreground'}>
            {communityTexts.COMMUNITY_SANCTUARY_DESCRIPTION}
        </p>
        <div className={'space-y-2'}>
            <GuidelineItem
                icon={Shield}
                label={communityTexts.COMMUNITY_SANCTUARY_RULE_1}
            />
            <GuidelineItem
                icon={Lock}
                label={communityTexts.COMMUNITY_SANCTUARY_RULE_2}
            />
            <GuidelineItem
                icon={UserX}
                label={communityTexts.COMMUNITY_SANCTUARY_RULE_3}
            />
        </div>
        <Button
            variant={'outline'}
            size={'sm'}
            className={'mt-4 w-full'}
        >
            {communityTexts.COMMUNITY_SANCTUARY_READ_GUIDELINES}
        </Button>
    </div>
)