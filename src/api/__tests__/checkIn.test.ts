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
            patch: vi.fn()
        }
    } ))

vi.mock(
    '@/lib/time',
    () => ( {
        formatByUserPreference: vi.fn(() => '01/01')
    } ))

vi.mock(
    '@/constants/defaults',
    () => ( {
        defaults: {
            checkIn: {
                dateFormat: 'MM/dd'
            }
        }
    } ))

import { api } from '@/api'
import {
    createCheckIn,
    fetchCheckInHistory,
    fetchCheckIns,
    fetchCheckInStats,
    getCheckIn,
    patchCheckIn,
    submitCheckIn,
    updateCheckIn
} from '@/api/checkIn'

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

const mockStats = {
    total: 10,
    totalCheckIns: 10,
    avgMood: 6.5,
    averageMoodScore: 6.5,
    avgPain: 3.2,
    averagePainLevel: 3.2,
    topActivities: ['walking'],
    currentStreak: 5,
    longestStreak: 10,
    moodTrend: [],
    painTrend: [],
    milestonesAchieved: 2
}

// ==================== checkIn API ====================
describe(
    'checkIn API',
    () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        // ==================== fetchCheckIns ====================
        describe(
            'fetchCheckIns',
            () => {
                it(
                    'should GET /check-in without params when no limit',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: { data: [mockCheckIn] }
                            })

                        await fetchCheckIns()
                        expect(api.get)
                            .toHaveBeenCalledWith(
                                '/check-in',
                                { params: { limit: undefined } }
                            )
                    })

                it(
                    'should GET /check-in with limit param',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: { data: [mockCheckIn] }
                            })

                        await fetchCheckIns(5)
                        expect(api.get)
                            .toHaveBeenCalledWith(
                                '/check-in',
                                { params: { limit: 5 } }
                            )
                    })

                it(
                    'should return array of check-ins',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: { data: [mockCheckIn] }
                            })

                        const result = await fetchCheckIns()
                        expect(result).toEqual([mockCheckIn])
                    })
            })

        // ==================== fetchCheckInHistory ====================
        describe(
            'fetchCheckInHistory',
            () => {
                it(
                    'should GET /check-in without limit when no days',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: { data: [] }
                            })

                        await fetchCheckInHistory()
                        expect(api.get)
                            .toHaveBeenCalledWith(
                                '/check-in',
                                { params: {} }
                            )
                    })

                it(
                    'should GET /check-in with limit when days provided',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: { data: [] }
                            })

                        await fetchCheckInHistory(7)
                        expect(api.get)
                            .toHaveBeenCalledWith(
                                '/check-in',
                                { params: { limit: 7 } }
                            )
                    })

                it(
                    'should map check-ins to MoodPainSeriesPoint shape',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: { data: [mockCheckIn] }
                            })

                        const result = await fetchCheckInHistory(7)
                        expect(result).toHaveLength(1)
                        expect(result[0]).toMatchObject({
                            originalDate: mockCheckIn.checkInDate,
                            mood: mockCheckIn.moodScore,
                            pain: mockCheckIn.painLevel
                        })
                    })
            })

        // ==================== submitCheckIn ====================
        describe(
            'submitCheckIn',
            () => {
                it(
                    'should POST to /check-in with data',
                    async () => {
                        const input = {
                            moodScore: 7,
                            painLevel: 3,
                            activities: ['walking']
                        }
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({
                                data: { data: mockCheckIn }
                            })

                        await submitCheckIn(input as never)
                        expect(api.post)
                            .toHaveBeenCalledWith(
                                '/check-in',
                                input
                            )
                    })

                it(
                    'should return the created check-in',
                    async () => {
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({
                                data: { data: mockCheckIn }
                            })

                        const result = await submitCheckIn({} as never)
                        expect(result).toEqual(mockCheckIn)
                    })
            })

        // ==================== createCheckIn ====================
        describe(
            'createCheckIn',
            () => {
                it(
                    'should POST to /check-in',
                    async () => {
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({
                                data: { data: mockCheckIn }
                            })

                        await createCheckIn({} as never)
                        expect(api.post)
                            .toHaveBeenCalledWith('/check-in', {})
                    })

                it(
                    'should return the check-in',
                    async () => {
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({
                                data: { data: mockCheckIn }
                            })

                        const result = await createCheckIn({} as never)
                        expect(result).toEqual(mockCheckIn)
                    })
            })

        // ==================== fetchCheckInStats ====================
        describe(
            'fetchCheckInStats',
            () => {
                it(
                    'should GET /check-in/stats without params when no period',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: { data: mockStats }
                            })

                        await fetchCheckInStats()
                        expect(api.get)
                            .toHaveBeenCalledWith(
                                '/check-in/stats',
                                { params: {} }
                            )
                    })

                it(
                    'should GET /check-in/stats with period param',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: { data: mockStats }
                            })

                        await fetchCheckInStats('weekly')
                        expect(api.get)
                            .toHaveBeenCalledWith(
                                '/check-in/stats',
                                { params: { period: 'weekly' } }
                            )
                    })

                it(
                    'should return stats',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: { data: mockStats }
                            })

                        const result = await fetchCheckInStats()
                        expect(result).toEqual(mockStats)
                    })
            })

        // ==================== patchCheckIn ====================
        describe(
            'patchCheckIn',
            () => {
                it(
                    'should PATCH /check-in/:id with data',
                    async () => {
                        const patch = { moodScore: 8 }
                        vi.mocked(api.patch)
                            .mockResolvedValueOnce({
                                data: { data: mockCheckIn }
                            })

                        await patchCheckIn('ci-1', patch as never)
                        expect(api.patch)
                            .toHaveBeenCalledWith(
                                '/check-in/ci-1',
                                patch
                            )
                    })

                it(
                    'should return the updated check-in',
                    async () => {
                        vi.mocked(api.patch)
                            .mockResolvedValueOnce({
                                data: { data: mockCheckIn }
                            })

                        const result = await patchCheckIn('ci-1', {})
                        expect(result).toEqual(mockCheckIn)
                    })
            })

        // ==================== updateCheckIn ====================
        describe(
            'updateCheckIn',
            () => {
                it(
                    'should PATCH /check-in/:id',
                    async () => {
                        vi.mocked(api.patch)
                            .mockResolvedValueOnce({
                                data: { data: mockCheckIn }
                            })

                        await updateCheckIn('ci-1', { painLevel: 2 } as never)
                        expect(api.patch)
                            .toHaveBeenCalledWith(
                                '/check-in/ci-1',
                                { painLevel: 2 }
                            )
                    })
            })

        // ==================== getCheckIn ====================
        describe(
            'getCheckIn',
            () => {
                it(
                    'should GET /check-in/:id',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: { data: mockCheckIn }
                            })

                        await getCheckIn('ci-1')
                        expect(api.get)
                            .toHaveBeenCalledWith('/check-in/ci-1')
                    })

                it(
                    'should return the check-in',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({
                                data: { data: mockCheckIn }
                            })

                        const result = await getCheckIn('ci-1')
                        expect(result).toEqual(mockCheckIn)
                    })
            })
    })
