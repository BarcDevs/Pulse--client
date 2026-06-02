'use client'

import {
    createContext,
    type ReactNode,
    useContext,
    useState
} from 'react'

import type {
    Profile,
    ProfileUpdateInput
} from '@/types/profile'

import { useSaveSettings } from '@/hooks/mutations/useSaveSettings'
import { useProfileQuery } from '@/hooks/profile/useProfileQuery'

type SettingValue = string | boolean | string[]

type SettingsContextType = {
    settings: Partial<Profile>
    isLoading: boolean
    isSaving: boolean
    hasChanges: boolean
    onSettingChange: (
        key: keyof Profile,
        value: SettingValue
    ) => void
    onSave: () => void
    onDiscard: () => void
}

const SettingsContext = createContext<
    SettingsContextType | undefined
>(undefined)

type SettingsProviderProps = {
    children: ReactNode
}

export const SettingsProvider = ({
    children
}: SettingsProviderProps) => {
    const { data: profile, isLoading } =
        useProfileQuery()
    const {
        mutate: saveSettings,
        isPending: isSaving
    } = useSaveSettings()

    const [pendingChanges, setPendingChanges] =
        useState<Partial<Profile>>({})

    const hasChanges = Object.keys(
        pendingChanges
    ).length > 0

    const handleSettingChange = (
        key: keyof Profile,
        value: SettingValue
    ) => {
        setPendingChanges((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const handleDiscard = () => {
        setPendingChanges({})
    }

    const handleSave = () => {
        if (!pendingChanges || !profile) return

        const updates: Partial<Profile> = {}

        Object.entries(pendingChanges).forEach((
            [key, value]
        ) => {
            if (profile[key as keyof Profile] !== value) {
                (updates as Record<string, unknown>)[key] = value
            }
        })

        if (Object.keys(updates).length > 0) {
            saveSettings(updates as ProfileUpdateInput, {
                onSuccess: () => {
                    setPendingChanges({})
                }
            })
        }
    }

    const value: SettingsContextType = {
        settings: profile
            ? {
                ...profile,
                ...pendingChanges
            }
            : pendingChanges,
        isLoading,
        isSaving,
        hasChanges,
        onSettingChange: handleSettingChange,
        onSave: handleSave,
        onDiscard: handleDiscard
    }

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettings = () => {
    const context = useContext(SettingsContext)

    if (context === undefined) {
        throw new Error(
            'useSettings must be used within SettingsProvider'
        )
    }

    return context
}
