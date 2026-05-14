'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { Footer } from '@/components/shared/footer/Footer'

import { useAuth } from '@/context/AuthContext'

import { LandingNav } from './navbar/LandingNav'
import { CTASection } from './sections/cta/CTASection'
import { FeaturesSection } from './sections/features/FeaturesSection'
import { HeroSection } from './sections/hero/HeroSection'
import { HowItWorksSection } from './sections/howItWorks/HowItWorksSection'

export const LandingPageContent = () => {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && user)
            router.replace('/dashboard')
    }, [user, isLoading, router])

    if (isLoading || user) return null

    return (
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
}
