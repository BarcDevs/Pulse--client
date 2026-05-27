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

import { api } from '@/api'
import {
    addActivities,
    addInterests,
    getProfile,
    getProfileOptions,
    removeActivity,
    removeInterest,
    updateProfile
} from '@/api/profile'

const mockProfile = { id: 'p-1', userId: 'u-1', bio: 'test', avatarUrl: null }
const mockProfileOptions = { interests: [], activities: [] }
const mockInterest = { id: 'i-1', slug: 'cardio', label: 'Cardio' }
const mockActivity = { id: 'a-1', slug: 'walking', label: 'Walking' }

// ==================== profile API ====================
describe(
    'profile API',
    () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        // ==================== getProfile ====================
        describe(
            'getProfile',
            () => {
                it(
                    'should GET /profile',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({ data: { data: mockProfile } })

                        await getProfile()
                        expect(api.get)
                            .toHaveBeenCalledWith('/profile')
                    })

                it(
                    'should return the profile data',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({ data: { data: mockProfile } })

                        const result = await getProfile()
                        expect(result).toEqual(mockProfile)
                    })
            })

        // ==================== updateProfile ====================
        describe(
            'updateProfile',
            () => {
                it(
                    'should PATCH /profile with updates',
                    async () => {
                        const updates = { bio: 'updated bio' }
                        vi.mocked(api.patch)
                            .mockResolvedValueOnce({ data: { data: mockProfile } })

                        await updateProfile(updates)
                        expect(api.patch)
                            .toHaveBeenCalledWith('/profile', updates)
                    })

                it(
                    'should return the updated profile',
                    async () => {
                        const updated = { ...mockProfile, bio: 'updated bio' }
                        vi.mocked(api.patch)
                            .mockResolvedValueOnce({ data: { data: updated } })

                        const result = await updateProfile({ bio: 'updated bio' })
                        expect(result).toEqual(updated)
                    })
            })

        // ==================== getProfileOptions ====================
        describe(
            'getProfileOptions',
            () => {
                it(
                    'should GET /profile/options',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({ data: { data: mockProfileOptions } })

                        await getProfileOptions()
                        expect(api.get)
                            .toHaveBeenCalledWith('/profile/options')
                    })

                it(
                    'should return the profile options',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({ data: { data: mockProfileOptions } })

                        const result = await getProfileOptions()
                        expect(result).toEqual(mockProfileOptions)
                    })
            })

        // ==================== addInterests ====================
        describe(
            'addInterests',
            () => {
                it(
                    'should POST to /profile/health-interests with slugs wrapper',
                    async () => {
                        const slugs = ['cardio']
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({ data: { data: [mockInterest] } })

                        await addInterests(slugs)
                        expect(api.post)
                            .toHaveBeenCalledWith('/profile/health-interests', { slugs })
                    })

                it(
                    'should return the interests array',
                    async () => {
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({ data: { data: [mockInterest] } })

                        const result = await addInterests(['cardio'])
                        expect(result).toEqual([mockInterest])
                    })
            })

        // ==================== removeInterest ====================
        describe(
            'removeInterest',
            () => {
                it(
                    'should DELETE /profile/health-interests/:slug',
                    async () => {
                        vi.mocked(api.delete)
                            .mockResolvedValueOnce({})

                        await removeInterest('cardio')
                        expect(api.delete)
                            .toHaveBeenCalledWith('/profile/health-interests/cardio')
                    })

                it(
                    'should resolve void',
                    async () => {
                        vi.mocked(api.delete)
                            .mockResolvedValueOnce({})

                        const result = await removeInterest('cardio')
                        expect(result).toBeUndefined()
                    })
            })

        // ==================== addActivities ====================
        describe(
            'addActivities',
            () => {
                it(
                    'should POST to /profile/activities with slugs wrapper',
                    async () => {
                        const slugs = ['walking']
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({ data: { data: [mockActivity] } })

                        await addActivities(slugs)
                        expect(api.post)
                            .toHaveBeenCalledWith('/profile/activities', { slugs })
                    })

                it(
                    'should return the activities array',
                    async () => {
                        vi.mocked(api.post)
                            .mockResolvedValueOnce({ data: { data: [mockActivity] } })

                        const result = await addActivities(['walking'])
                        expect(result).toEqual([mockActivity])
                    })
            })

        // ==================== removeActivity ====================
        describe(
            'removeActivity',
            () => {
                it(
                    'should DELETE /profile/activities/:slug',
                    async () => {
                        vi.mocked(api.delete)
                            .mockResolvedValueOnce({})

                        await removeActivity('walking')
                        expect(api.delete)
                            .toHaveBeenCalledWith('/profile/activities/walking')
                    })

                it(
                    'should resolve void',
                    async () => {
                        vi.mocked(api.delete)
                            .mockResolvedValueOnce({})

                        const result = await removeActivity('walking')
                        expect(result).toBeUndefined()
                    })
            })
    })
