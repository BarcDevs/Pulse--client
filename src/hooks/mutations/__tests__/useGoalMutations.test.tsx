import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'
import {
    act,
    renderHook,
    waitFor
} from '@testing-library/react'

import { useGoalMutations } from '@/hooks/mutations/useGoalMutations'

import { recoveryGoalsQueryKeys } from '@/constants/queryKeys'

const createMilestone = vi.fn()
const deleteMilestone = vi.fn()

vi.mock('@/api/goals', () => ({
    completeMilestone: vi.fn(),
    createGoal: vi.fn(),
    createMilestone: (...args: unknown[]) =>
        createMilestone(...args),
    deleteGoal: vi.fn(),
    deleteMilestone: (...args: unknown[]) =>
        deleteMilestone(...args),
    updateGoal: vi.fn(),
    updateMilestone: vi.fn()
}))

const setup = () => {
    const client = new QueryClient()
    const invalidate = vi.spyOn(client, 'invalidateQueries')
    const wrapper = ({
        children
    }: {
        children: React.ReactNode
    }) => (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
    const { result } = renderHook(
        () => useGoalMutations(),
        { wrapper }
    )

    return { result, invalidate }
}

describe('useGoalMutations milestone invalidation', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        createMilestone.mockResolvedValue({})
        deleteMilestone.mockResolvedValue(undefined)
    })

    it('invalidates goal and list after create', async () => {
        const { result, invalidate } = setup()

        await act(() =>
            result.current.milestone.create.mutateAsync({
                goalId: 'g1',
                data: { title: 'm' } as never
            })
        )

        await waitFor(() => {
            expect(invalidate).toHaveBeenCalledWith({
                queryKey: recoveryGoalsQueryKeys.goal('g1')
            })
            expect(invalidate).toHaveBeenCalledWith({
                queryKey: recoveryGoalsQueryKeys.all
            })
        })
    })

    it('invalidates goal and list after delete', async () => {
        const { result, invalidate } = setup()

        await act(() =>
            result.current.milestone.delete.mutateAsync({
                goalId: 'g1',
                milestoneId: 'm1'
            })
        )

        await waitFor(() => {
            expect(invalidate).toHaveBeenCalledWith({
                queryKey: recoveryGoalsQueryKeys.goal('g1')
            })
            expect(invalidate).toHaveBeenCalledWith({
                queryKey: recoveryGoalsQueryKeys.all
            })
        })
    })
})
