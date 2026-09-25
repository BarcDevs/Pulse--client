import { useTranslations } from 'next-intl'

import { HelpCircle } from 'lucide-react'

import { NavItemButton } from '@/components/shared/buttons/NavItemButton'

import { settingsLocales } from '@/locales/settingsLocales'

export const SettingsSidebarFooter = () => {
    const t = useTranslations()

    return (
        <div className={'pt-4 mt-4 border-t border-border'}>
            <span className={'text-xs font-medium text-muted-foreground uppercase tracking-wider px-4'}>
                {t(settingsLocales.support.label)}
            </span>
            <NavItemButton className={'mt-2'}>
                <HelpCircle className={'h-5 w-5'}/>
                {t(settingsLocales.support.helpCenter)}
            </NavItemButton>
        </div>
    )
}