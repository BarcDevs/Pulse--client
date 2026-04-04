import { Button } from '@/components/ui/button'

import { settingsPageTexts } from '@/constants/componentTexts/settings'

export const SettingsFooter = () => (
    <div className={'flex items-center justify-end gap-3 pt-4 border-t border-border'}>
        <Button variant={'outline'}>
            {settingsPageTexts.buttons.discardChanges}
        </Button>
        <Button className={'bg-primary hover:bg-primary/90 text-primary-foreground'}>
            {settingsPageTexts.buttons.savePreferences}
        </Button>
    </div>
)