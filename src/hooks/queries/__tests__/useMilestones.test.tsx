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

import { useMilestones } from '@/hooks/queries/useMilestones'

import { recoveryGoalsQueryKeys } from '@/constants/queryKeys'

const fetchGoal = vi.fn()

vi.mock('@/hooks/queries/useGoals', () => ({
    useGoals: () => ({ data: [{ id: 'g1' }] })
}))
vi.mock('@/api/goals', () => ({
    fetchGoal: (goalId: string) => fetchGoal(goalId)
}))

const goalWith = (milestoneIds: string[]) => ({
    id: 'g1',
    milestones: milestoneIds.map(id => ({
        id,
        status: 'ACTIVE'
    }))
})

describe('useMilestones', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('refetches when the goal query is invalidated', async () => {
        fetchGoal.mockResolvedValueOnce(goalWith(['m1']))
        fetchGoal.mockResolvedValueOnce(goalWith(['m1', 'm2']))
        const client = new QueryClient()
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
            () => useMilestones(),
            { wrapper }
        )
        await waitFor(() =>
            expect(result.current.allMilestones).toHaveLength(1)
        )

        await act(() =>
            client.invalidateQueries({
                queryKey: recoveryGoalsQueryKeys.goal('g1')
            })
        )

        await waitFor(() =>
            expect(result.current.allMilestones).toHaveLength(2)
        )
    })
})
