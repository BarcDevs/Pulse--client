import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

const {
    mockSubmitCheckIn,
    mockCreateCheckIn,
    mockPatchCheckIn
} = vi.hoisted(() => ({
    mockSubmitCheckIn: vi.fn(),
    mockCreateCheckIn: vi.fn(),
    mockPatchCheckIn: vi.fn()
}))

vi.mock('@/api/checkIn', () => ({
    submitCheckIn: mockSubmitCheckIn,
    createCheckIn: mockCreateCheckIn,
    patchCheckIn: mockPatchCheckIn
}))

import {
    handleCheckInCreate,
    handleCheckInSave,
    handleCheckInSubmit,
    handleCheckInUpdate
} from '@/handlers/actions/checkIn'

// ==================== checkIn actions ====================
describe(
    'checkIn actions',
    () => {
        const mockCheckIn = {
            id: 'ci-1',
            userId: 'u-1',
            checkInDate: '2024-01-01T00:00:00Z',
            moodScore: 7,
            painLevel: 3,
            activities: ['walking'],
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
        }

        const mockData = {
            moodScore: 7,
            painLevel: 3,
            activities: ['walking']
        }

        beforeEach(() => {
            vi.clearAllMocks()
        })

        // ==================== handleCheckInSubmit ====================
        describe('handleCheckInSubmit',
            () => {
                it(
                    'should delegate to submitCheckIn with data',
                    async () => {
                        mockSubmitCheckIn
                            .mockResolvedValueOnce(mockCheckIn)

                        await handleCheckInSubmit(mockData)

                        expect(mockSubmitCheckIn)
                            .toHaveBeenCalledWith(mockData)
                    })

                it(
                    'should return result from submitCheckIn',
                    async () => {
                        mockSubmitCheckIn
                            .mockResolvedValueOnce(mockCheckIn)

                        const result = await handleCheckInSubmit(mockData)

                        expect(result).toEqual(mockCheckIn)
                    })
            })

        // ==================== handleCheckInCreate ====================
        describe('handleCheckInCreate',
            () => {
                it(
                    'should delegate to createCheckIn with data',
                    async () => {
                        mockCreateCheckIn
                            .mockResolvedValueOnce(mockCheckIn)

                        await handleCheckInCreate(mockData)

                        expect(mockCreateCheckIn)
                            .toHaveBeenCalledWith(mockData)
                    })

                it(
                    'should return result from createCheckIn',
                    async () => {
                        mockCreateCheckIn
                            .mockResolvedValueOnce(mockCheckIn)

                        const result = await handleCheckInCreate(mockData)

                        expect(result).toEqual(mockCheckIn)
                    })
            })

        // ==================== handleCheckInUpdate ====================
        describe('handleCheckInUpdate',
            () => {
                it(
                    'should delegate to patchCheckIn with id and data',
                    async () => {
                        mockPatchCheckIn
                            .mockResolvedValueOnce(mockCheckIn)

                        await handleCheckInUpdate('ci-1', mockData)

                        expect(mockPatchCheckIn)
                            .toHaveBeenCalledWith('ci-1', mockData)
                    })

                it(
                    'should return result from patchCheckIn',
                    async () => {
                        mockPatchCheckIn
                            .mockResolvedValueOnce(mockCheckIn)

                        const result = await handleCheckInUpdate('ci-1', mockData)

                        expect(result).toEqual(mockCheckIn)
                    })
            })

        // ==================== handleCheckInSave ====================
        describe('handleCheckInSave',
            () => {
                // -------------------- when no existingCheckIn --------------------
                describe('when no existingCheckIn',
                    () => {
                        it(
                            'should call createCheckIn with data',
                            async () => {
                                mockCreateCheckIn
                                    .mockResolvedValueOnce(mockCheckIn)

                                await handleCheckInSave(mockData)

                                expect(mockCreateCheckIn)
                                    .toHaveBeenCalledWith(mockData)
                                expect(mockPatchCheckIn)
                                    .not.toHaveBeenCalled()
                            })

                        it(
                            'should return { checkIn, created: true }',
                            async () => {
                                mockCreateCheckIn
                                    .mockResolvedValueOnce(mockCheckIn)

                                const result = await handleCheckInSave(mockData)

                                expect(result).toEqual({
                                    checkIn: mockCheckIn,
                                    created: true
                                })
                            })

                        it(
                            'should call createCheckIn when existingCheckIn is undefined',
                            async () => {
                                mockCreateCheckIn
                                    .mockResolvedValueOnce(mockCheckIn)

                                await handleCheckInSave(mockData, undefined)

                                expect(mockCreateCheckIn)
                                    .toHaveBeenCalledWith(mockData)
                            })
                    })

                // -------------------- when existingCheckIn provided --------------------
                describe('when existingCheckIn provided',
                    () => {
                        it(
                            'should call patchCheckIn with existingCheckIn.id and data',
                            async () => {
                                mockPatchCheckIn
                                    .mockResolvedValueOnce(mockCheckIn)

                                await handleCheckInSave(mockData, mockCheckIn)

                                expect(mockPatchCheckIn)
                                    .toHaveBeenCalledWith(mockCheckIn.id, mockData)
                                expect(mockCreateCheckIn)
                                    .not.toHaveBeenCalled()
                            })

                        it(
                            'should return { checkIn, created: false }',
                            async () => {
                                const updatedCheckIn = { ...mockCheckIn, moodScore: 8 }
                                mockPatchCheckIn
                                    .mockResolvedValueOnce(updatedCheckIn)

                                const result = await handleCheckInSave(mockData, mockCheckIn)

                                expect(result).toEqual({
                                    checkIn: updatedCheckIn,
                                    created: false
                                })
                            })
                    })

                // -------------------- error handling --------------------
                describe('error handling',
                    () => {
                        it(
                            'should propagate errors from createCheckIn',
                            async () => {
                                const error = new Error('Network error')
                                mockCreateCheckIn
                                    .mockRejectedValueOnce(error)

                                expect(
                                    handleCheckInSave(mockData)
                                ).rejects.toThrow('Network error')
                            })

                        it(
                            'should propagate errors from patchCheckIn',
                            async () => {
                                const error = new Error('CheckIn not found')
                                mockPatchCheckIn
                                    .mockRejectedValueOnce(error)

                                expect(
                                    handleCheckInSave(mockData, mockCheckIn)
                                ).rejects.toThrow('CheckIn not found')
                            })
                    })
            })
    })
