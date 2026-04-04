import {
    Bell,
    Lock,
    Palette,
    Shield
} from 'lucide-react'

import type { SetState } from '@/types/utils/react'

import { settingsPageTexts }
    from '@/constants/componentTexts/settings'

import { SettingsSidebarFooter } from './SettingsSidebarFooter'
import { SettingsTabButton } from './SettingsTabButton'

type SettingsSidebarProps = {
    activeTab: string
    onTabChange: SetState<string>
}

const iconMap = {
    Bell,
    Lock,
    Shield,
    Palette
}

type IconMapKey = keyof typeof iconMap

export const SettingsSidebar = ({
    activeTab,
    onTabChange
}: SettingsSidebarProps) => (
    <div className={'space-y-2'}>
        {settingsPageTexts.tabs.map((tab) => {
            const IconComponent = iconMap[tab.icon as IconMapKey]

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
