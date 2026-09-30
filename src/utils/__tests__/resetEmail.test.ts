import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    clearResetEmail,
    getResetEmail,
    saveResetEmail
} from '@/utils/resetEmail'

beforeEach(() => {
    clearResetEmail()
})

afterEach(() => {
    vi.restoreAllMocks()
})

describe('resetEmail', () => {
    it('returns null when nothing was saved', () => {
        expect(getResetEmail()).toBeNull()
    })

    it('saves and reads the email', () => {
        saveResetEmail('user@test.com')

        expect(getResetEmail()).toBe('user@test.com')
        expect(sessionStorage.getItem('auth:reset:email'))
            .toBe('user@test.com')
    })

    it('never writes to localStorage, so it does not outlive the tab', () => {
        saveResetEmail('user@test.com')

        expect(localStorage.length).toBe(0)
    })

    it('clears the email', () => {
        saveResetEmail('user@test.com')
        clearResetEmail()

        expect(getResetEmail()).toBeNull()
        expect(sessionStorage.getItem('auth:reset:email')).toBeNull()
    })

    it('falls back to memory when sessionStorage is blocked', () => {
        vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new Error('blocked')
        })
        vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
            throw new Error('blocked')
        })

        saveResetEmail('user@test.com')

        expect(getResetEmail()).toBe('user@test.com')
    })
})
