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
    showLinks?: boolean
}

export const Footer = ({
    className,
    showLinks = true
}: FooterProps = {}) => {
    const t = useTranslations()

    return (
        <footer className={cn(
            'bg-surface-section border-t border-border',
            className
        )}>
            <div className={'mx-auto max-w-7xl px-4 py-4 md:py-6'}>
                {showLinks ? (
                    <div className={'mb-8 grid grid-cols-1 gap-8 md:grid-cols-4'}>
                        <FooterBrand/>
                        <FooterLinks/>
                        <FooterLegal/>
                        <FooterSocial/>
                    </div>
                ) : (
                    <div className={'mb-4 flex items-center justify-between'}>
                        <FooterBrand/>
                        <FooterSocial/>
                    </div>
                )}

                <div className={'border-t border-border pt-4 text-center'}>
                    <p className={'text-sm text-muted-foreground'}>
                        {t(globalLocales.footer.copyright)}
                    </p>
                </div>
            </div>
        </footer>
    )
}
