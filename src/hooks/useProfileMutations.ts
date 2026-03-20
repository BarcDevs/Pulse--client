import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import {Profile} from '@/types/profile'

import {
    addActivities,
    addInterests,
    removeActivity,
    removeInterest,
    updateProfile} from '@/api/profile'

import {profileQueryKey} from './useProfileQuery'

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

export const useAddInterestsMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addInterests,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: profileQueryKey
            })
        }
    })
}

export const useRemoveInterestMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: removeInterest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: profileQueryKey
            })
        }
    })
}

export const useAddActivitiesMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: addActivities,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: profileQueryKey
            })
        }
    })
}

export const useRemoveActivityMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: removeActivity,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: profileQueryKey
            })
        }
    })
}