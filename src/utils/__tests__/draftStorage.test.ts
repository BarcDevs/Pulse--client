import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import {
    clearAllDrafts,
    sweepExpiredDrafts
} from '@/utils/draftStorage'

const future = () => JSON.stringify({ data: {}, expiresAt: Date.now() + 1000 })
const past = () => JSON.stringify({ data: {}, expiresAt: Date.now() - 1000 })

// ==================== draftStorage ====================
describe(
    'draftStorage',
    () => {
        beforeEach(() => {
            localStorage.clear()
            vi.useFakeTimers()
        })

        afterEach(() => {
            vi.useRealTimers()
        })

        it(
            'clearAllDrafts removes community and profile drafts only',
            () => {
                localStorage.setItem('community:draft:user-1:post', future())
                localStorage.setItem('profile:draft:basicInfo:user-1', future())
                localStorage.setItem('theme', 'dark')

                clearAllDrafts()

                expect(localStorage.getItem('community:draft:user-1:post')).toBeNull()
                expect(localStorage.getItem('profile:draft:basicInfo:user-1')).toBeNull()
                expect(localStorage.getItem('theme')).toBe('dark')
            })

        it(
            'sweepExpiredDrafts removes expired and unreadable drafts, keeps live ones',
            () => {
                localStorage.setItem('community:draft:user-1:post', past())
                localStorage.setItem('community:draft:user-1:reply:p1', 'not json')
                localStorage.setItem('profile:draft:basicInfo:user-1', future())
                localStorage.setItem('theme', 'dark')

                sweepExpiredDrafts()

                expect(localStorage.getItem('community:draft:user-1:post')).toBeNull()
                expect(localStorage.getItem('community:draft:user-1:reply:p1')).toBeNull()
                expect(localStorage.getItem('profile:draft:basicInfo:user-1')).not.toBeNull()
                expect(localStorage.getItem('theme')).toBe('dark')
            })
    })
