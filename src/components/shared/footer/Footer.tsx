'use client'

import { ClassName } from '@/types/react'

import { cn } from '@/lib/utils'

import { FEATURES } from '@/config/features'

import { FooterBrand } from './FooterBrand'
import { FooterCredit } from './FooterCredit'
import { FooterLegal } from './FooterLegal'
import { FooterLinks } from './FooterLinks'
import { FooterSocial } from './FooterSocial'
import { FooterSupport } from './FooterSupport'

type FooterProps = {
    className?: ClassName
    showLinks?: boolean
}

export const Footer = ({
    className,
    showLinks = true
}: FooterProps = {}) => {
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
                        <FooterSupport/>
                        <FooterLegal/>
                        {FEATURES.socialLinks && <FooterSocial/>}
                    </div>
                ) : (
                    <div className={'mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'}>
                        <FooterBrand/>
                        {FEATURES.socialLinks && <FooterSocial/>}
                    </div>
                )}

                <div className={'border-t border-border pt-4 text-center'}>
                    <FooterCredit/>
                </div>
            </div>
        </footer>
    )
}
