import { Logo } from '@/components/shared/brand/Logo'

import { NavAuthLinks } from './NavAuthLinks'
import { NavLinks } from './NavLinks'

export const LandingNav = () => (
    <header className={'sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-surface-card/90 px-6 backdrop-blur-md md:px-12'}>
        <Logo/>

        <NavLinks/>

        <NavAuthLinks/>
    </header>
)
