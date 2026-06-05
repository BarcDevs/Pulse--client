import { useTranslations } from 'next-intl'

import { HelpCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { settingsLocales } from '@/locales/settingsLocales'

export const SettingsSidebarFooter = () => {
    const t = useTranslations()

    return (
        <div className={'pt-4 mt-4 border-t border-border'}>
            <span className={'text-xs font-medium text-muted-foreground uppercase tracking-wider px-4'}>
                {t(settingsLocales.support.label)}
            </span>
            <Button
                variant={'ghost'}
                className={'w-full justify-start gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-surface-section hover:text-foreground mt-2'}
            >
                <HelpCircle className={'h-5 w-5'}/>
                {t(settingsLocales.support.helpCenter)}
            </Button>
        </div>
    )
}