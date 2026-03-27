import {ClassName} from '@/types/react'

import {cn} from '@/lib/utils'

import {FOOTER_COPYRIGHT} from '@/constants/footerTexts'
import {BRAND_NAME} from '@/constants/plainTexts'

import {FooterBrand} from './footer/FooterBrand'
import {FooterLegal} from './footer/FooterLegal'
import {FooterLinks} from './footer/FooterLinks'
import {FooterSocial} from './footer/FooterSocial'

type FooterProps = {
    className?: ClassName
}

export const Footer = ({
    className
}: FooterProps = {}) => (
    <footer className={cn(
        'bg-surface-section border-t border-border',
        className
    )}>
        <div className='max-w-7xl mx-auto px-4 py-4 md:py-6'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
                <FooterBrand />
                <FooterLinks />
                <FooterLegal />
                <FooterSocial />
            </div>

            <div className='border-t border-border pt-4 text-center'>
                <p className='text-sm text-muted-foreground'>
                    {FOOTER_COPYRIGHT(
                        2026,
                        BRAND_NAME
                    )}
                </p>
            </div>
        </div>
    </footer>
)
