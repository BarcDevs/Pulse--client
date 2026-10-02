import { useQueryClient } from '@tanstack/react-query'

import type { Profile } from '@/types/profile'

import { authQueryKeys } from '@/constants/queryKeys'

import { profileQueryKey } from './useProfileQuery'

// The server stores the last anonymity choice on the profile; mirror it in
// both cached copies so the next form starts from it without a refetch
export const useRememberAnonymity = () => {
    const queryClient = useQueryClient()

    return (isAnonymous: boolean | undefined) => {
        if (isAnonymous === undefined) return

        for (const queryKey of [
            profileQueryKey,
            authQueryKeys.profile
        ]) {
            queryClient.setQueryData<Profile>(
                queryKey,
                (profile) => profile && {
                    ...profile,
                    anonymousParticipation: isAnonymous
                }
            )
        }
    }
}
