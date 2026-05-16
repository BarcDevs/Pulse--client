import { Footer } from '@/components/shared/footer/Footer'

import { LandingNav } from './navbar/LandingNav'
import { CTASection } from './sections/cta/CTASection'
import { FeaturesSection } from './sections/features/FeaturesSection'
import { HeroSection } from './sections/hero/HeroSection'
import { HowItWorksSection } from './sections/howItWorks/HowItWorksSection'

export const LandingPageContent = () => (
    <div className={'min-h-screen bg-surface-page'}>
        <LandingNav/>

        <main>
            <HeroSection/>
            <FeaturesSection/>
            <HowItWorksSection/>
            <CTASection/>
        </main>

        <Footer showLinks={false}/>
    </div>
)
