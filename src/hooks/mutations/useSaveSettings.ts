import { useMutation } from '@tanstack/react-query'

import type { Profile } from '@/types/profile'

import { useInvalidateProfileQuery
} from '@/hooks/profile/useProfileQuery'

import { updateProfile } from '@/api/profile'

export const useSaveSettings = () => {
    const invalidateProfile = useInvalidateProfileQuery()

    return useMutation({
        mutationFn: (updates: Partial<Profile>) =>
            updateProfile(updates),
        onSuccess: () => {
            invalidateProfile()
        }
    })
}