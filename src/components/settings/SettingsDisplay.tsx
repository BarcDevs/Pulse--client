import { SETTINGS_TABS_CONFIG } from '@/config/settingsTabs'

import { AppPreferences } from './sections/AppPreferences'
import { NotificationsSettings } from './sections/NotificationsSettings'
import { PrivacySettings } from './sections/PrivacySettings'
import { SecuritySettings } from './sections/SecuritySettings'
import { SettingsFooter } from './SettingsFooter'

type Tab = typeof SETTINGS_TABS_CONFIG[number]

type SettingsDisplayProps = {
    tabs: readonly Tab[]
    activeTab: string
}

export const SettingsDisplay = ({
    activeTab
}: SettingsDisplayProps) => (
    <div className={'lg:col-span-3 space-y-6'}>
        {activeTab === 'notifications' && <NotificationsSettings/>}
        {activeTab === 'privacy' && <PrivacySettings/>}
        {activeTab === 'security' && <SecuritySettings/>}
        {activeTab === 'preferences' && <AppPreferences/>}

        <SettingsFooter/>
    </div>
)
