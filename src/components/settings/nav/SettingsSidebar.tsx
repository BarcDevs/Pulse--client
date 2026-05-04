import { useTranslations } from 'next-intl'

import {
    Bell,
    Lock,
    Palette,
    Shield
} from 'lucide-react'

import type { SetState } from '@/types/react'

import { SETTINGS_TABS_CONFIG } from '@/config/settingsTabs'

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
}: SettingsSidebarProps) => {
    const t = useTranslations()

    return (
        <div className={'space-y-2'}>
            {SETTINGS_TABS_CONFIG.map((tab) => {
                const IconComponent = iconMap[tab.icon as IconMapKey]

                return (
                    <SettingsTabButton
                        key={tab.id}
                        icon={IconComponent}
                        label={t(tab.labelKey)}
                        isActive={activeTab === tab.id}
                        onClick={() => onTabChange(tab.id)}
                    />
                )
            })}

            <SettingsSidebarFooter/>
        </div>
    )
}
