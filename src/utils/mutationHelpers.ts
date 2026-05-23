import type { QueryClient } from '@tanstack/react-query'

import type { Profile } from '@/types/profile'

import { authQueryKeys } from '@/constants/queryKeys'

type StringArrayProfileField =
    | 'likedPostIds'
    | 'likedReplyIds'
    | 'savedPostIds'

export const profileToggleCallbacks =
    <K extends StringArrayProfileField>(
        queryClient: QueryClient,
        field: K,
        id: string
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
        },
        onSettled: () => {
            void queryClient.invalidateQueries({
                queryKey: authQueryKeys.profile
            })
        }
    })
