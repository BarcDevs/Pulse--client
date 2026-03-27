import {AppPreferences} from './AppPreferences'
import {NotificationsSettings} from './NotificationsSettings'
import {PrivacySettings} from './PrivacySettings'
import {SecuritySettings} from './SecuritySettings'
import {SettingsFooter} from './SettingsFooter'

type SettingsDisplayProps = {
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
