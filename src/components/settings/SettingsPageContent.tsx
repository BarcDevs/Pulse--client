'use client'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { SETTINGS_TABS_CONFIG } from '@/config/settingsTabs'

import { SettingsProvider } from '@/context/SettingsContext'

import { SettingsSidebar } from './nav/SettingsSidebar'
import { SettingsDisplay } from './SettingsDisplay'

const firstActiveTab = SETTINGS_TABS_CONFIG
    .find((tab) => tab.active)?.id ?? 'security'

export const SettingsPageContent = () => {
    const tabParam = useSearchParams().get('tab')
    const isValidTab = SETTINGS_TABS_CONFIG
        .some((tab) => tab.active && tab.id === tabParam)

    const [activeTab, setActiveTab] = useState<string>(
        isValidTab && tabParam ? tabParam : firstActiveTab
    )

    return (
        <SettingsProvider>
            <div className={'p-6'}>
                <div className={'grid grid-cols-1 lg:grid-cols-4 gap-6'}>
                    <SettingsSidebar
                        activeTab={activeTab}
                        onTabChangeAction={setActiveTab}
                    />

                    <SettingsDisplay activeTab={activeTab}/>
                </div>
            </div>
        </SettingsProvider>
    )
}
