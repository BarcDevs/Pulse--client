import { CTAContent } from './CTAContent'
import { CTADecorations } from './CTADecorations'

export const CTASection = () => (
    <section className={'px-6 py-12 md:px-12'}>
        <div className={'relative mx-auto max-w-2xl overflow-hidden rounded-3xl bg-linear-to-br from-primary-gradient-start to-primary-deep px-12 py-14 text-center shadow-xl'}>
            <CTADecorations/>
            <CTAContent/>
        </div>
    </section>
)
