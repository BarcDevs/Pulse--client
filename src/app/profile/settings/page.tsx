import {AppShell} from '@/components/layout/AppShell'
import {Header} from '@/components/layout/Header'
import {SettingsContent} from '@/components/settings/SettingsContent'

import * as SettingsTexts from '@/constants/settingsTexts'

const SettingsPage = () => (
    <AppShell>
        <Header
            title={SettingsTexts.SETTINGS_TITLE}
            subtitle={SettingsTexts.SETTINGS_SUBTITLE}
        />
        <SettingsContent/>
    </AppShell>
)

export default SettingsPage
