import { useMutation } from '@tanstack/react-query'

import type { ProfileUpdateInput } from '@/types/profile'

import { useInvalidateProfileQuery } from '@/hooks/profile/useProfileQuery'

import { updateProfile } from '@/api/profile'

export const useSaveSettings = () => {
    const invalidateProfile = useInvalidateProfileQuery()

    return useMutation({
        mutationFn: (updates: ProfileUpdateInput) =>
            updateProfile(updates),
        onSuccess: () => {
            invalidateProfile()
        }
    })
}