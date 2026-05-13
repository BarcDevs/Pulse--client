'use client'

import { useState } from 'react'

import { SETTINGS_TABS_CONFIG } from '@/config/settingsTabs'

import { SettingsProvider } from '@/context/SettingsContext'

import { SettingsSidebar } from './nav/SettingsSidebar'
import { SettingsDisplay } from './SettingsDisplay'

const visibleTabs = SETTINGS_TABS_CONFIG.filter((tab) => tab.active)

export const SettingsPageContent = () => {
    const [activeTab, setActiveTab] =
        useState<string>(visibleTabs[0]?.id ?? 'security')

    return (
        <SettingsProvider>
            <div className={'p-6'}>
                <div className={'grid grid-cols-1 lg:grid-cols-4 gap-6'}>
                    <SettingsSidebar
                        tabs={visibleTabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    <SettingsDisplay
                        tabs={visibleTabs}
                        activeTab={activeTab}
                    />
                </div>
            </div>
        </SettingsProvider>
    )
}
