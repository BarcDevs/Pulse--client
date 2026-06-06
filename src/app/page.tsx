import type { Metadata } from 'next'

import { LandingPageContent } from '@/components/landing/LandingPageContent'

import { createPageMetadata } from '@/config/pagesMetadata'

export const metadata: Metadata = createPageMetadata({
    title: 'HealEase - Recovery Tracking, Support & Wellness',
    description: 'Track your recovery, build healthy routines, connect with a supportive community, and gain meaningful insights throughout your healing journey.',
    path: '/'
})

const Home = () => <LandingPageContent/>

export default Home
