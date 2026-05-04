'use client'

import { useTranslations } from 'next-intl'

import { ClassName } from '@/types/react'

import { cn } from '@/lib/utils'

import { globalLocales } from '@/locales/globalLocales'

import { FooterBrand } from './FooterBrand'
import { FooterLegal } from './FooterLegal'
import { FooterLinks } from './FooterLinks'
import { FooterSocial } from './FooterSocial'

type FooterProps = {
    className?: ClassName
}

export const Footer = ({
    className
}: FooterProps = {}) => {
    const t = useTranslations()

    return (
        <footer className={cn(
            'bg-surface-section border-t border-border',
            className
        )}>
            <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <FooterBrand/>
                    <FooterLinks/>
                    <FooterLegal/>
                    <FooterSocial/>
                </div>

                <div className="border-t border-border pt-4 text-center">
                    <p className="text-sm text-muted-foreground">
                        {t(globalLocales.footer.copyright)}
                    </p>
                </div>
            </div>
        </footer>
    )
}
