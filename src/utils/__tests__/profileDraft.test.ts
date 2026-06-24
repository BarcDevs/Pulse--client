import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

vi.mock('@/config', () => ({
    default: { profileDraftTtl: 30 * 60 * 1000 }
}))

import {
    clearProfileDraft,
    getProfileDraft,
    saveProfileDraft
} from '@/utils/profileDraft'

const TTL_MS = 30 * 60 * 1000

const userIdA = 'user-a'
const userIdB = 'user-b'

const draftData = {
    username: 'alice',
    firstName: 'Alice',
    lastName: 'Smith',
    location: 'Tel Aviv',
    bio: 'Recovering one day at a time',
    healthInterests: ['mindfulness'],
    activityPreferences: ['walking'],
    dateOfBirth: '1990-01-01',
    recoveryType: 'outpatient',
    careProvider: 'Dr. Cohen'
}

describe('profileDraft', () => {
    beforeEach(() => {
        localStorage.clear()
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    describe('saveProfileDraft + getProfileDraft', () => {
        it('returns saved data within TTL', () => {
            saveProfileDraft(userIdA, draftData)

            expect(getProfileDraft(userIdA)).toEqual(draftData)
        })

        it('returns null after TTL expires', () => {
            saveProfileDraft(userIdA, draftData)
            vi.advanceTimersByTime(TTL_MS + 1)

            expect(getProfileDraft(userIdA)).toBeNull()
        })

        it('returns null for a user that never saved a draft', () => {
            expect(getProfileDraft(userIdB)).toBeNull()
        })

        it('scopes drafts per user so one user cannot read another user\'s draft', () => {
            saveProfileDraft(userIdA, draftData)

            expect(getProfileDraft(userIdB)).toBeNull()
            expect(getProfileDraft(userIdA)).toEqual(draftData)
        })
    })

    describe('clearProfileDraft', () => {
        it('removes draft so subsequent read returns null', () => {
            saveProfileDraft(userIdA, draftData)
            clearProfileDraft(userIdA)

            expect(getProfileDraft(userIdA)).toBeNull()
        })

        it('does not throw when no draft exists for the user', () => {
            expect(() => clearProfileDraft(userIdA)).not.toThrow()
        })

        it('does not affect another user\'s draft', () => {
            saveProfileDraft(userIdA, draftData)
            saveProfileDraft(userIdB, draftData)
            clearProfileDraft(userIdA)

            expect(getProfileDraft(userIdA)).toBeNull()
            expect(getProfileDraft(userIdB)).toEqual(draftData)
        })
    })
})
