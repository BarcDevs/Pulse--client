import { GradientCard } from '@/components/shared/cards/GradientCard'

import { CTAContent } from './CTAContent'
import { CTADecorations } from './CTADecorations'

export const CTASection = () => (
    <section className={'px-6 py-12 md:px-12'}>
        <GradientCard
            variant={'hero'}
            className={'relative mx-auto max-w-2xl overflow-hidden'}
        >
            <CTADecorations/>
            <CTAContent/>
        </GradientCard>
    </section>
)
