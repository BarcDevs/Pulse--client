'use client'

import { useState } from 'react'

import { SETTINGS_TABS_CONFIG } from '@/config/settingsTabs'

import { SettingsProvider } from '@/context/SettingsContext'

import { SettingsSidebar } from './nav/SettingsSidebar'
import { SettingsDisplay } from './SettingsDisplay'

const firstActiveTab = SETTINGS_TABS_CONFIG
    .find((tab) => tab.active)?.id ?? 'security'

export const SettingsPageContent = () => {
    const [activeTab, setActiveTab] =
        useState<string>(firstActiveTab)

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
