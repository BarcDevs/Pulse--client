'use client'

import { useTranslations } from 'next-intl'

import { Icon } from '@/components/shared/ui/Icon'

import { socialMediaLinks }
    from '@/constants/socialConfig'

import { globalLocales } from '@/locales/globalLocales'

export const FooterSocial = () => {
    const t = useTranslations()

    return (
        <div>
            <h3 className={'font-semibold mb-4'}>
                {t(globalLocales.footer.socialTitle)}
            </h3>
            <div className={'flex gap-4'}>
                {socialMediaLinks.map(link => (
                    <a
                        key={link.href}
                        href={link.href}
                        target={'_blank'}
                        rel={'noopener noreferrer'}
                        className={'inline-flex transition-transform hover:scale-110 active:scale-95'}
                        aria-label={link.title}
                    >
                        <Icon
                            name={link.icon}
                            size={24}
                        />
                    </a>
                ))}
            </div>
        </div>
    )
}
