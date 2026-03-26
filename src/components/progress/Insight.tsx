import {Sparkles} from 'lucide-react'

import {CloseButton} from '@/components/shared/ui/CloseButton'
import {Button} from '@/components/ui/button'

import * as ProgressTexts from '@/constants/progressTexts'

export const ProgressInsight = () => (
    <div className={'mt-6 relative overflow-hidden rounded-2xl bg-primary p-6 text-white'}>
        <div className={'relative z-10'}>
            <div className={'flex items-center gap-2'}>
                <Sparkles className={'size-5'}/>
                <span className={'text-sm font-medium uppercase tracking-wider opacity-80'}>
                  {ProgressTexts.PROGRESS_INSIGHT_LABEL}
                </span>
            </div>
            <h3 className={'mt-4 text-2xl font-semibold text-balance'}>
                {ProgressTexts.PROGRESS_INSIGHT_TITLE}
            </h3>
            <p className={'mt-3 max-w-2xl text-white/80'}>
                {ProgressTexts.PROGRESS_INSIGHT_DESCRIPTION}
            </p>
            <div className={'mt-6 flex gap-3'}>
                <Button
                    variant={'outline'}
                    className={'border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white'}
                >
                    {ProgressTexts.PROGRESS_INSIGHT_BUTTON_PRIMARY}
                </Button>
                <Button className={'bg-white text-primary hover:bg-white/90'}>
                    {ProgressTexts.PROGRESS_INSIGHT_BUTTON_SECONDARY}
                </Button>
            </div>
        </div>

        <CloseButton className={'absolute right-4 top-4 h-6 w-6 p-0 text-white/60 hover:bg-white/10 hover:text-white'}/>

        <div className={'absolute -right-10 -bottom-10 opacity-10'}>
            <svg className={'size-64'} viewBox={'0 0 200 200'}>
                <circle cx={'100'} cy={'100'} r={'80'} fill={'currentColor'}/>
            </svg>
        </div>
    </div>
)
