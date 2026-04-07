import {
    Lock,
    Shield,
    UserX
} from 'lucide-react'

import { GuidelineItem } from '@/components/shared/content/GuidelineItem'
import { Button } from '@/components/ui/button'

import { communityPageTexts } from '@/constants/componentTexts/community'

export const SanctuaryCard = () => (
    <div className={'rounded-2xl border border-primary/20 bg-primary/5 p-5'}>
        <h3 className={'mb-2 font-semibold text-foreground'}>
            {communityPageTexts.sanctuary.title}
        </h3>
        <p className={'mb-4 text-sm text-muted-foreground'}>
            {communityPageTexts.sanctuary.description}
        </p>
        <div className={'space-y-2'}>
            <GuidelineItem
                icon={Shield}
                label={communityPageTexts.sanctuary.rules[0]}
            />
            <GuidelineItem
                icon={Lock}
                label={communityPageTexts.sanctuary.rules[1]}
            />
            <GuidelineItem
                icon={UserX}
                label={communityPageTexts.sanctuary.rules[2]}
            />
        </div>
        <Button
            variant={'outline'}
            size={'sm'}
            className={'mt-4 w-full'}
        >
            {/* todo: add community guidelines */}
            {communityPageTexts.sanctuary.readGuidelines}
        </Button>
    </div>
)