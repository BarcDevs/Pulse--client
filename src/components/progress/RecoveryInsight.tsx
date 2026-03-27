import {Sparkles, X} from 'lucide-react'

import {Button} from '@/components/ui/button'

import {progressPageTexts} from '@/constants/componentTexts/progress'

export const RecoveryInsight = () => (
    <div className={'rounded-2xl bg-linear-to-r from-primary-gradient-start to-primary-gradient-end p-6 text-primary-foreground'}>
        <div className={'flex items-start justify-between'}>
            <div className={'flex items-center gap-2'}>
                <Sparkles className={'h-5 w-5'}/>
                <span className={'text-sm font-medium'}>
            {progressPageTexts.insight.label}
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
            {progressPageTexts.insight.title}
        </h3>

        <p className={'mt-3 text-primary-foreground/80 text-sm leading-relaxed'}>
            {progressPageTexts.insight.description}
        </p>

        <div className={'mt-6 flex items-center gap-3'}>
            <Button
                variant={'secondary'}
                className={'bg-white text-primary hover:bg-white/90'}
            >
                {progressPageTexts.insight.buttonPrimary}
            </Button>
            <Button
                variant={'ghost'}
                className={'text-primary-foreground hover:bg-white/10'}
            >
                {progressPageTexts.insight.buttonSecondary}
            </Button>
        </div>
    </div>
)
