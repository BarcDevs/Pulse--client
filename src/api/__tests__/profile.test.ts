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
import { ENDPOINTS } from '@/api/routes'
import {
    getProfile,
    getProfileOptions,
    updateProfile
} from '@/api/profile'

const mockProfile = {
    id: 'p-1',
    userId: 'u-1',
    bio: 'test',
    avatarUrl: null
}

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
                            .toHaveBeenCalledWith(ENDPOINTS.profile.base)
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
                            .toHaveBeenCalledWith(ENDPOINTS.profile.base, updates)
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
                    'should GET /profile/list/activities',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({ data: { data: [] } })

                        await getProfileOptions()
                        expect(api.get)
                            .toHaveBeenCalledWith(ENDPOINTS.profile.listActivities)
                    })

                it(
                    'should return activityPreferences wrapped in ProfileOptions',
                    async () => {
                        vi.mocked(api.get)
                            .mockResolvedValueOnce({ data: { data: [] } })

                        const result = await getProfileOptions()
                        expect(result).toEqual({ activityPreferences: [] })
                    })
            })

    })
