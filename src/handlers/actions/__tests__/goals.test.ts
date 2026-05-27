import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { GoalCategory } from '@/types/goals'

const { mockCreateGoal, mockUpdateGoal } = vi.hoisted(() => ({
    mockCreateGoal: vi.fn(),
    mockUpdateGoal: vi.fn()
}))

vi.mock('@/api/goals', () => ({
    createGoal: mockCreateGoal,
    updateGoal: mockUpdateGoal
}))

import {
    handleGoalCreate,
    handleGoalSave,
    handleGoalUpdate
} from '@/handlers/actions/goals'

// ==================== goals actions ====================
describe(
    'goals actions',
    () => {
        const mockGoal = {
            id: 'g-1',
            profileId: 'p-1',
            title: 'Walk daily',
            description: null,
            category: 'PHYSICAL',
            status: 'ACTIVE',
            isPrimary: true,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
        }

        const mockData = {
            title: 'Walk daily',
            category: GoalCategory.PHYSICAL
        }

        beforeEach(() => {
            vi.clearAllMocks()
        })

        // ==================== handleGoalCreate ====================
        describe('handleGoalCreate',
            () => {
                it(
                    'should call createGoal with provided data',
                    async () => {
                        mockCreateGoal.mockResolvedValueOnce(mockGoal)

                        await handleGoalCreate(mockData as never)

                        expect(mockCreateGoal).toHaveBeenCalledWith(mockData)
                    })

                it(
                    'should return the result from createGoal',
                    async () => {
                        mockCreateGoal.mockResolvedValueOnce(mockGoal)

                        const result = await handleGoalCreate(mockData as never)

                        expect(result).toEqual(mockGoal)
                    })
            })

        // ==================== handleGoalUpdate ====================
        describe('handleGoalUpdate',
            () => {
                it(
                    'should call updateGoal with goalId and data',
                    async () => {
                        mockUpdateGoal.mockResolvedValueOnce(mockGoal)

                        await handleGoalUpdate('g-1', mockData)

                        expect(mockUpdateGoal).toHaveBeenCalledWith('g-1', mockData)
                    })

                it(
                    'should return the result from updateGoal',
                    async () => {
                        const updatedGoal = { ...mockGoal, title: 'Run daily' }
                        mockUpdateGoal.mockResolvedValueOnce(updatedGoal)

                        const result = await handleGoalUpdate('g-1', { title: 'Run daily' })

                        expect(result).toEqual(updatedGoal)
                    })
            })

        // ==================== handleGoalSave ====================
        describe('handleGoalSave',
            () => {
                // -------------------- when no existingGoal --------------------
                describe('when no existingGoal',
                    () => {
                        it(
                            'should call createGoal when no existingGoal is provided',
                            async () => {
                                mockCreateGoal.mockResolvedValueOnce(mockGoal)

                                await handleGoalSave(mockData as never)

                                expect(mockCreateGoal).toHaveBeenCalledWith(mockData)
                                expect(mockUpdateGoal).not.toHaveBeenCalled()
                            })

                        it(
                            'should return { goal, created: true }',
                            async () => {
                                mockCreateGoal.mockResolvedValueOnce(mockGoal)

                                const result = await handleGoalSave(mockData as never)

                                expect(result).toEqual({ goal: mockGoal, created: true })
                            })
                    })

                // -------------------- when existingGoal provided --------------------
                describe('when existingGoal provided',
                    () => {
                        it(
                            'should call updateGoal with existingGoal.id and data',
                            async () => {
                                mockUpdateGoal.mockResolvedValueOnce(mockGoal)

                                await handleGoalSave(mockData as never, mockGoal as never)

                                expect(mockUpdateGoal).toHaveBeenCalledWith('g-1', mockData)
                                expect(mockCreateGoal).not.toHaveBeenCalled()
                            })

                        it(
                            'should return { goal, created: false }',
                            async () => {
                                const updatedGoal = { ...mockGoal, title: 'Walk daily updated' }
                                mockUpdateGoal.mockResolvedValueOnce(updatedGoal)

                                const result = await handleGoalSave(mockData as never, mockGoal as never)

                                expect(result).toEqual({ goal: updatedGoal, created: false })
                            })
                    })

                // -------------------- error handling --------------------
                describe('error handling',
                    () => {
                        it(
                            'should propagate errors from createGoal',
                            async () => {
                                const error = new Error('Network error')
                                mockCreateGoal.mockRejectedValueOnce(error)

                                expect(
                                    handleGoalSave(mockData as never)
                                ).rejects.toThrow('Network error')
                            })

                        it(
                            'should propagate errors from updateGoal',
                            async () => {
                                const error = new Error('Goal not found')
                                mockUpdateGoal.mockRejectedValueOnce(error)

                                expect(
                                    handleGoalSave(mockData as never, mockGoal as never)
                                ).rejects.toThrow('Goal not found')
                            })
                    })
            })
    })
