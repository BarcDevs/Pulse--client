import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

vi.mock(
    '@/api/index',
    () => ( {
        api: {
            get: vi.fn(),
            post: vi.fn(),
            patch: vi.fn(),
            delete: vi.fn()
        }
    } ))

import type { GoalInput } from '@/types/goals'

import { api } from '@/api'
import {
    completeMilestone,
    createGoal,
    createMilestone,
    deleteGoal,
    deleteMilestone,
    fetchGoal,
    fetchGoals,
    fetchRecoveryGoalsStats,
    updateGoal,
    updateMilestone
} from '@/api/goals'

const mockGoal = {
    id: 'g-1', profileId: 'p-1', title: 'Walk daily',
    description: null, category: 'PHYSICAL', status: 'ACTIVE',
    isPrimary: true, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z'
}
const mockMilestone = {
    id: 'm-1', goalId: 'g-1', title: 'First week',
    status: 'ACTIVE', order: 1,
    createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z'
}

// ==================== goals API ====================
describe(
    'goals API',
    () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        // ==================== fetchGoals ====================
        describe(
            'fetchGoals',
            () => {
                it(
                    'should GET /recovery-goals',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: { data: [mockGoal] }
                            })

                        await fetchGoals()
                        expect(api.get)
                            .toHaveBeenCalledWith('/recovery-goals')
                    })

                it(
                    'should uppercase status and category on returned goals',
                    async () => {
                        const rawGoal = { ...mockGoal, status: 'active', category: 'physical' }
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: { data: [rawGoal] }
                            })

                        const result = await fetchGoals()
                        expect(result[0].status).toBe('ACTIVE')
                        expect(result[0].category).toBe('PHYSICAL')
                    })
            })

        // ==================== fetchGoal ====================
        describe(
            'fetchGoal',
            () => {
                it(
                    'should GET /recovery-goals/:id',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: {
                                    data: {
                                        goal: mockGoal,
                                        milestones: [mockMilestone]
                                    }
                                }
                            })

                        await fetchGoal('g-1')
                        expect(api.get)
                            .toHaveBeenCalledWith('/recovery-goals/g-1')
                    })

                it(
                    'should uppercase status on each milestone',
                    async () => {
                        const rawMilestone = { ...mockMilestone, status: 'active' }
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: {
                                    data: {
                                        goal: mockGoal,
                                        milestones: [rawMilestone]
                                    }
                                }
                            })

                        const result = await fetchGoal('g-1')
                        expect(result.milestones![0].status).toBe('ACTIVE')
                    })
            })

        // ==================== createGoal ====================
        describe(
            'createGoal',
            () => {
                it(
                    'should POST to /recovery-goals with data',
                    async () => {
                        const input = { title: 'Walk daily', category: 'PHYSICAL', isPrimary: false } as GoalInput
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({
                                data: { data: mockGoal }
                            })

                        await createGoal(input)
                        expect(api.post)
                            .toHaveBeenCalledWith('/recovery-goals', input)
                    })

                it(
                    'should return the created goal',
                    async () => {
                        const input = { title: 'Walk daily', category: 'PHYSICAL', isPrimary: false } as GoalInput
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({
                                data: { data: mockGoal }
                            })

                        const result = await createGoal(input)
                        expect(result).toEqual(mockGoal)
                    })
            })

        // ==================== updateGoal ====================
        describe(
            'updateGoal',
            () => {
                it(
                    'should PATCH /recovery-goals/:id with data',
                    async () => {
                        const patch = { title: 'Updated title' }
                        vi.mocked(api.patch)
                            .mockResolvedValueOnce({
                                data: { data: mockGoal }
                            })

                        await updateGoal('g-1', patch)
                        expect(api.patch)
                            .toHaveBeenCalledWith('/recovery-goals/g-1', patch)
                    })

                it(
                    'should return the updated goal',
                    async () => {
                        const patch = { title: 'Updated title' }
                        const updated = { ...mockGoal, title: 'Updated title' }
                        vi.mocked(api.patch)
                            .mockResolvedValueOnce({
                                data: { data: updated }
                            })

                        const result = await updateGoal('g-1', patch)
                        expect(result).toEqual(updated)
                    })
            })

        // ==================== deleteGoal ====================
        describe(
            'deleteGoal',
            () => {
                it(
                    'should DELETE /recovery-goals/:id',
                    async () => {
                        vi.mocked(api.delete)
                            .mockResolvedValueOnce({})

                        await deleteGoal('g-1')
                        expect(api.delete)
                            .toHaveBeenCalledWith('/recovery-goals/g-1')
                    })

                it(
                    'should resolve void',
                    async () => {
                        vi.mocked(api.delete)
                            .mockResolvedValueOnce({})

                        const result = await deleteGoal('g-1')
                        expect(result).toBeUndefined()
                    })
            })

        // ==================== createMilestone ====================
        describe(
            'createMilestone',
            () => {
                it(
                    'should POST to /recovery-goals/:goalId/milestones with data',
                    async () => {
                        const input = { title: 'First week', order: 1 }
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({
                                data: { data: mockMilestone }
                            })

                        await createMilestone('g-1', input)
                        expect(api.post)
                            .toHaveBeenCalledWith('/recovery-goals/g-1/milestones', input)
                    })

                it(
                    'should return the created milestone',
                    async () => {
                        const input = { title: 'First week', order: 1 }
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({
                                data: { data: mockMilestone }
                            })

                        const result = await createMilestone('g-1', input)
                        expect(result).toEqual(mockMilestone)
                    })
            })

        // ==================== updateMilestone ====================
        describe(
            'updateMilestone',
            () => {
                it(
                    'should PATCH /recovery-goals/:goalId/milestones/:milestoneId with data',
                    async () => {
                        const patch = { title: 'Updated milestone' }
                        vi.mocked(api.patch)
                            .mockResolvedValueOnce({
                                data: { data: mockMilestone }
                            })

                        await updateMilestone('g-1', 'm-1', patch)
                        expect(api.patch)
                            .toHaveBeenCalledWith('/recovery-goals/g-1/milestones/m-1', patch)
                    })

                it(
                    'should return the updated milestone',
                    async () => {
                        const patch = { title: 'Updated milestone' }
                        const updated = { ...mockMilestone, title: 'Updated milestone' }
                        vi.mocked(api.patch)
                            .mockResolvedValueOnce({
                                data: { data: updated }
                            })

                        const result = await updateMilestone('g-1', 'm-1', patch)
                        expect(result).toEqual(updated)
                    })
            })

        // ==================== deleteMilestone ====================
        describe(
            'deleteMilestone',
            () => {
                it(
                    'should DELETE /recovery-goals/:goalId/milestones/:milestoneId',
                    async () => {
                        vi.mocked(api.delete)
                            .mockResolvedValueOnce({})

                        await deleteMilestone('g-1', 'm-1')
                        expect(api.delete)
                            .toHaveBeenCalledWith('/recovery-goals/g-1/milestones/m-1')
                    })

                it(
                    'should resolve void',
                    async () => {
                        vi.mocked(api.delete)
                            .mockResolvedValueOnce({})

                        const result = await deleteMilestone('g-1', 'm-1')
                        expect(result).toBeUndefined()
                    })
            })

        // ==================== completeMilestone ====================
        describe(
            'completeMilestone',
            () => {
                it(
                    'should PATCH /recovery-goals/:goalId/milestones/:milestoneId/complete with no body',
                    async () => {
                        vi.mocked(api.patch)
                            .mockResolvedValueOnce({
                                data: { data: mockMilestone }
                            })

                        await completeMilestone('g-1', 'm-1')
                        expect(api.patch)
                            .toHaveBeenCalledWith('/recovery-goals/g-1/milestones/m-1/complete')
                    })

                it(
                    'should return the completed milestone',
                    async () => {
                        const completed = { ...mockMilestone, status: 'COMPLETED' }
                        vi.mocked(api.patch)
                            .mockResolvedValueOnce({
                                data: { data: completed }
                            })

                        const result = await completeMilestone('g-1', 'm-1')
                        expect(result).toEqual(completed)
                    })
            })

        // ==================== fetchRecoveryGoalsStats ====================
        describe(
            'fetchRecoveryGoalsStats',
            () => {
                it(
                    'should GET /recovery-goals/stats',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: { data: { total: 3, active: 2, completed: 1 } }
                            })

                        await fetchRecoveryGoalsStats()
                        expect(api.get)
                            .toHaveBeenCalledWith('/recovery-goals/stats')
                    })

                it(
                    'should return the stats',
                    async () => {
                        const mockStats = { total: 3, active: 2, completed: 1 }
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: { data: mockStats }
                            })

                        const result = await fetchRecoveryGoalsStats()
                        expect(result).toEqual(mockStats)
                    })
            })
    })
