'use client'

import { useSaveSettings } from '@/hooks/mutations/useSaveSettings'
import { useUpdateUser } from '@/hooks/mutations/useUpdateUser'
import { useUser } from '@/hooks/ui/useUser'

import type { BasicInfoSchema } from '@/validations/forms/basicInfoSchema'

export const useBasicInfoSubmit = (onSuccess: () => void) => {
    const { user } = useUser()
    const {
        mutateAsync: updateUser,
        isPending: isUpdatingUser
    } = useUpdateUser()

    const {
        mutateAsync: saveSettings,
        isPending: isSavingSettings
    } = useSaveSettings()

    const onSubmit = async (data: BasicInfoSchema) => {
        if (!user) return

        const userUpdates: Record<string, string> = {}
        const profileUpdates: Record<string, string> = {}

        if (
            data.firstName
            && data.firstName !== user.firstName
        ) userUpdates.firstName = data.firstName

        if (
            data.lastName
            && data.lastName !== user.lastName
        ) userUpdates.lastName = data.lastName

        if (
            data.location !== undefined
            && data.location !== (user.profile?.location)
        ) profileUpdates.location = data.location

        await Promise.all([
            Object.keys(userUpdates).length > 0
                ? updateUser(userUpdates)
                : Promise.resolve(),
            Object.keys(profileUpdates).length > 0
                ? saveSettings(profileUpdates as any)
                : Promise.resolve()
        ])

        onSuccess()
    }

    return {
        onSubmit,
        isSaving: isUpdatingUser || isSavingSettings
    }
}
