import {HelpCircle} from 'lucide-react'

import {Button} from '@/components/ui/button'

import {settingsPageTexts} from '@/constants/componentTexts/settings'

export const SettingsSidebarFooter = () => (
    <div className={'pt-4 mt-4 border-t border-border'}>
        <span className={'text-xs font-medium text-muted-foreground uppercase tracking-wider px-4'}>
            {settingsPageTexts.support.label}
        </span>
        <Button
            variant={'ghost'}
            className={'w-full justify-start gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-surface-section hover:text-foreground mt-2'}
        >
            <HelpCircle className={'h-5 w-5'}/>
            {settingsPageTexts.support.helpCenter}
        </Button>
    </div>
)