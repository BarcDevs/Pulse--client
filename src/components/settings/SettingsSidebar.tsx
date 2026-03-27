import {
    Bell,
    Lock,
    Palette,
    Shield
} from 'lucide-react'

import * as SettingsTexts from '@/constants/settingsTexts'

import {SettingsSidebarFooter} from './SettingsSidebarFooter'
import {SettingsTabButton} from './SettingsTabButton'

type SettingsSidebarProps = {
    activeTab: string
    onTabChange: (tabId: string) => void
}

const iconMap = {
    Bell,
    Lock,
    Shield,
    Palette
}

export const SettingsSidebar = ({
    activeTab,
    onTabChange
}: SettingsSidebarProps) => (
    <div className={'space-y-2'}>
        {SettingsTexts.SETTINGS_TABS.map((tab) => {
            const IconComponent = iconMap[tab.icon as keyof typeof iconMap]
            return (
                <SettingsTabButton
                    key={tab.id}
                    icon={IconComponent}
                    label={tab.label}
                    isActive={activeTab === tab.id}
                    onClick={() => onTabChange(tab.id)}
                />
            )
        })}
        
        <SettingsSidebarFooter/>
    </div>
)
