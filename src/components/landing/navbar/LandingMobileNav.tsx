'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'

import { landingLocales } from '@/locales/landingLocales'

import { NavAuthLinks } from './NavAuthLinks'
import { NavLinks } from './NavLinks'

export const LandingMobileNav = () => {
    const t = useTranslations()
    const [open, setOpen] = useState(false)

    return (
        <Sheet
            open={open}
            onOpenChange={setOpen}
        >
            <SheetTrigger asChild>
                <Button
                    variant={'ghost'}
                    size={'icon'}
                    aria-label={t(landingLocales.nav.menu)}
                    className={'md:hidden'}
                >
                    <Menu className={'size-5'}/>
                </Button>
            </SheetTrigger>
            <SheetContent
                side={'right'}
                className={'flex flex-col gap-8 p-6'}
                showCloseButton={false}
            >
                <SheetTitle className={'sr-only'}>
                    {t(landingLocales.nav.menu)}
                </SheetTitle>
                <NavLinks
                    mobile
                    onLinkClickAction={() => setOpen(false)}
                />
                <NavAuthLinks mobile/>
            </SheetContent>
        </Sheet>
    )
}
