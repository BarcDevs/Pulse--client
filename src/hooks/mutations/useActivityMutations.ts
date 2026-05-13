import {
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import { profileQueryKeys } from '@/constants/queryKeys'

import {
    addActivities,
    removeActivity
} from '@/api/profile'

export const useActivityMutations = () => {
    const queryClient = useQueryClient()

    const invalidate = () =>
        queryClient.invalidateQueries({
            queryKey: profileQueryKeys.all
        })

    const add = useMutation({
        mutationFn: (slugs: string[]) => addActivities(slugs),
        onSuccess: invalidate
    })

    const remove = useMutation({
        mutationFn: (slug: string) => removeActivity(slug),
        onSuccess: invalidate
    })

    return {
        addActivities: add.mutate,
        addActivitiesAsync: add.mutateAsync,
        removeActivity: remove.mutate,
        removeActivityAsync: remove.mutateAsync,
        isPending: add.isPending || remove.isPending
    }
}
