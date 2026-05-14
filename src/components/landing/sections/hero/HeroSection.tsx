'use client'

import { HeroContent } from './HeroContent'
import { HeroPreviewCard } from './HeroPreviewCard'

export const HeroSection = () => (
    <section className={'mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 py-20 md:flex-row md:px-12'}>
        <HeroContent/>
        <div className={'w-full max-w-md flex-1 animate-fade-in'}>
            <HeroPreviewCard/>
        </div>
    </section>
)
