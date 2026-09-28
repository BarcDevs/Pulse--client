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
    showQuickLinks?: boolean
}

export const Footer = ({
    className,
    showLinks = true,
    showQuickLinks = true
}: FooterProps = {}) => {
    return (
        <footer className={cn(
            'bg-surface-section border-t border-border',
            className
        )}>
            <div className={'mx-auto max-w-7xl px-4 py-4 md:py-6'}>
                {showLinks ? (
                    <div className={'mb-8 flex flex-col gap-8 md:flex-row md:justify-between'}>
                        <FooterBrand/>
                        <div className={'flex flex-col gap-8 sm:flex-row sm:justify-evenly sm:gap-16 md:grow'}>
                            {showQuickLinks && <FooterLinks/>}
                            <FooterSupport/>
                            <FooterLegal/>
                            {FEATURES.socialLinks && <FooterSocial/>}
                        </div>
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
