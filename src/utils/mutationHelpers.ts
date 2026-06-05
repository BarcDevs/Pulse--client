import type { QueryClient } from '@tanstack/react-query'

import type { Profile } from '@/types/profile'

import { authQueryKeys } from '@/constants/queryKeys'

type StringArrayProfileField =
    | 'likedPostIds'
    | 'likedReplyIds'
    | 'savedPostIds'

export const profileToggleCallbacks =
    <K extends StringArrayProfileField, D>(
        queryClient: QueryClient,
        field: K,
        id: string,
        getActive: (data: D) => boolean
    ) => ({
        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: authQueryKeys.profile
            })
            const snapshot = queryClient.getQueryData<Profile>(
                authQueryKeys.profile
            )
            queryClient.setQueryData<Profile>(
                authQueryKeys.profile,
                (old) => {
                    if (!old) return old
                    const arr = old[field] as string[]
                    const isActive = arr.includes(id)
                    return {
                        ...old,
                        [field]: isActive
                            ? arr.filter((x) => x !== id)
                            : [...arr, id]
                    } as Profile
                }
            )
            return { snapshot }
        },
        // TODO: if server adds side effects to likes (badges, streaks) that mutate
        // other profile fields, they'll be missed until next stale refetch (5 min)
        onSuccess: (data: D) => {
            const isActive = getActive(data)
            queryClient.setQueryData<Profile>(
                authQueryKeys.profile,
                (old) => {
                    if (!old) return old
                    const arr = old[field] as string[]
                    return {
                        ...old,
                        [field]: isActive
                            ? arr.includes(id) ? arr : [...arr, id]
                            : arr.filter((x) => x !== id)
                    } as Profile
                }
            )
        },
        onError: (
            _err: unknown,
            _vars: unknown,
            context?: { snapshot: Profile | undefined }
        ) => {
            if (context?.snapshot)
                queryClient.setQueryData(
                    authQueryKeys.profile,
                    context.snapshot
                )
        }
    })
