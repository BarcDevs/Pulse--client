'use client'

import {useState} from 'react'

import {SettingsSidebar} from './nav/SettingsSidebar'
import {SettingsDisplay} from './SettingsDisplay'

export const SettingsPageContent = () => {
    const [activeTab, setActiveTab] = useState('notifications')

    return (
        <div className={'p-6'}>
            <div className={'grid grid-cols-1 lg:grid-cols-4 gap-6'}>
                <SettingsSidebar
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <SettingsDisplay activeTab={activeTab}/>
            </div>
        </div>
    )
}
