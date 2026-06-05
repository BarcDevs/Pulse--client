import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { Profile } from '@/types/profile'

import { updateProfile } from '@/api/profile'

import { profileQueryKey } from './useProfileQuery'

export const useUpdateProfileMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: (updatedProfile: Profile) => {
            queryClient.setQueryData(
                profileQueryKey,
                updatedProfile
            )
        }
    })
}