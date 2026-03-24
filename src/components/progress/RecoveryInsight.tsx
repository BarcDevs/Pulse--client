'use client'

import {Sparkles, X} from 'lucide-react'

import {Button} from '@/components/ui/button'

// todo: centralised import
import {
    PROGRESS_RECOVERY_INSIGHT_ACKNOWLEDGE,
    PROGRESS_RECOVERY_INSIGHT_DESCRIPTION,
    PROGRESS_RECOVERY_INSIGHT_KEEP,
    PROGRESS_RECOVERY_INSIGHT_LABEL,
    PROGRESS_RECOVERY_INSIGHT_TITLE
} from '@/constants/progressTexts'

export const RecoveryInsight = () => (
    <div className={'rounded-2xl bg-linear-to-r from-primary-gradient-start to-primary-gradient-end p-6 text-primary-foreground'}>
        <div className={'flex items-start justify-between'}>
            <div className={'flex items-center gap-2'}>
                <Sparkles className={'h-5 w-5'}/>
                <span className={'text-sm font-medium'}>
            {PROGRESS_RECOVERY_INSIGHT_LABEL}
        </span>
            </div>
            <Button
                variant={'ghost'}
                size={'sm'}
                className={'h-6 w-6 p-0 hover:bg-white/10'}
            >
                <X className={'h-4 w-4'}/>
            </Button>
        </div>

        <h3 className={'mt-4 text-xl font-semibold'}>
            {PROGRESS_RECOVERY_INSIGHT_TITLE}
        </h3>

        <p className={'mt-3 text-primary-foreground/80 text-sm leading-relaxed'}>
            {PROGRESS_RECOVERY_INSIGHT_DESCRIPTION}
        </p>

        <div className={'mt-6 flex items-center gap-3'}>
            <Button
                variant={'secondary'}
                className={'bg-white text-primary hover:bg-white/90'}
            >
                {PROGRESS_RECOVERY_INSIGHT_KEEP}
            </Button>
            <Button
                variant={'ghost'}
                className={'text-primary-foreground hover:bg-white/10'}
            >
                {PROGRESS_RECOVERY_INSIGHT_ACKNOWLEDGE}
            </Button>
        </div>
    </div>
)
