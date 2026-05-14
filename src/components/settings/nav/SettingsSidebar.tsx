'use client'

import { useTranslations } from 'next-intl'

import type { SetState } from '@/types/react'

import { SETTINGS_TABS_CONFIG } from '@/config/settingsTabs'

import { SettingsSidebarFooter } from './SettingsSidebarFooter'
import { SettingsTabButton } from './SettingsTabButton'

type SettingsSidebarProps = {
    activeTab: string
    onTabChangeAction: SetState<string>
}

export const SettingsSidebar = ({
    activeTab,
    onTabChangeAction
}: SettingsSidebarProps) => {
    const t = useTranslations()

    return (
        <div className={'space-y-2'}>
            {SETTINGS_TABS_CONFIG
                .filter((tab) => tab.active)
                .map((tab) => (
                <SettingsTabButton
                    key={tab.id}
                    icon={tab.icon}
                    label={t(tab.labelKey)}
                    isActive={activeTab === tab.id}
                    onClick={() => onTabChangeAction(tab.id)}
                />
            ))}

            <SettingsSidebarFooter/>
        </div>
    )
}