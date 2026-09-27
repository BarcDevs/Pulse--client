import { useTranslations } from 'next-intl'

import {
    Globe,
    Mail,
    Phone
} from 'lucide-react'

import { appSettings } from '@/config/appSettings'

import { supportLocales } from '@/locales/supportLocales'

export const SupportContactInfo = () => {
    const t = useTranslations()
    const items = [
        {
            id: 'email',
            icon: Mail,
            label: appSettings.supportEmail,
            href: `mailto:${appSettings.supportEmail}`
        },
        {
            id: 'phone',
            icon: Phone,
            label: appSettings.supportPhoneNumber,
            href: `tel:${appSettings.supportPhoneNumber}`
        },
        {
            id: 'languages',
            icon: Globe,
            label: t(supportLocales.contact.info.languages)
        }
    ].filter((item) => item.label)

    return (
        <div className={'flex flex-col gap-2.5 text-[13px]'}>
            {items.map((item) => (
                <div
                    key={item.id}
                    className={'flex items-center gap-2.5 text-on-surface'}
                >
                    <item.icon className={'size-3.5 text-primary'}/>
                    {item.href ? (
                        <a
                            href={item.href}
                            className={'hover:text-primary hover:underline'}
                        >
                            {item.label}
                        </a>
                    ) : item.label}
                </div>
            ))}
        </div>
    )
}
