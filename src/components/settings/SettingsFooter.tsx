import {Button} from '@/components/ui/button'

import * as SettingsTexts from '@/constants/settingsTexts'

export const SettingsFooter = () => (
    <div className={'flex items-center justify-end gap-3 pt-4 border-t border-border'}>
        <Button variant={'outline'}>
            {SettingsTexts.SETTINGS_DISCARD_CHANGES}
        </Button>
        <Button className={'bg-primary hover:bg-primary/90 text-primary-foreground'}>
            {SettingsTexts.SETTINGS_SAVE_PREFERENCES}
        </Button>
    </div>
)