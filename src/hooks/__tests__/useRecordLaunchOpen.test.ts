import { StrictMode } from 'react'

import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { renderHook } from '@testing-library/react'

import { useRecordLaunchOpen } from '@/hooks/useRecordLaunchOpen'

const recordLaunchOpen = vi.fn()

vi.mock('@/api/launchFunnel', () => ({
    recordLaunchOpen: (token: string) => recordLaunchOpen(token)
}))

const TOKEN = 'abcdEFGH12345678_-xyz'

const visit = (search: string) =>
    window.history.replaceState({}, '', `/${search}`)

describe('useRecordLaunchOpen', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        sessionStorage.clear()
        recordLaunchOpen.mockResolvedValue(undefined)
    })

    afterEach(() => visit(''))

    it('does nothing without an lm param', () => {
        visit('?utm_source=launch')
        renderHook(() => useRecordLaunchOpen())

        expect(recordLaunchOpen).not.toHaveBeenCalled()
    })

    it('ignores a token the server would reject', () => {
        visit('?lm=short')
        renderHook(() => useRecordLaunchOpen())

        expect(recordLaunchOpen).not.toHaveBeenCalled()
    })

    it('sends the token once on landing', () => {
        visit(`?utm_source=launch&utm_campaign=pulse&lm=${TOKEN}`)
        renderHook(() => useRecordLaunchOpen())

        expect(recordLaunchOpen).toHaveBeenCalledTimes(1)
        expect(recordLaunchOpen).toHaveBeenCalledWith(TOKEN)
    })

    it('sends once under Strict Mode', () => {
        visit(`?lm=${TOKEN}`)
        renderHook(() => useRecordLaunchOpen(), { wrapper: StrictMode })

        expect(recordLaunchOpen).toHaveBeenCalledTimes(1)
    })

    it('does not resend after a reload in the same session', () => {
        visit(`?lm=${TOKEN}`)
        renderHook(() => useRecordLaunchOpen()).unmount()
        renderHook(() => useRecordLaunchOpen())

        expect(recordLaunchOpen).toHaveBeenCalledTimes(1)
    })

    it('swallows a failed request', async () => {
        recordLaunchOpen.mockRejectedValue(new Error('400'))
        visit(`?lm=${TOKEN}`)

        expect(() => renderHook(() => useRecordLaunchOpen())).not.toThrow()
        await Promise.resolve()
    })
})
