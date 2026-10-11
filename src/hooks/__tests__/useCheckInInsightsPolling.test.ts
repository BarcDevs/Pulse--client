import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { act, renderHook } from '@testing-library/react'

import type { CheckIn } from '@/types/checkIn'

import { useCheckInInsightsPolling } from '@/hooks/useCheckInInsightsPolling'

import { timings } from '@/config/timings'

const fetchCheckIns = vi.fn()

vi.mock('@/api/checkIn', () => ({
    fetchCheckIns: (limit?: number) => fetchCheckIns(limit)
}))

const buildCheckIn = (
    insightsStatus: CheckIn['insightsStatus']
) => ({ id: 'c1', insightsStatus }) as CheckIn

const tick = (ms: number) => act(async () => {
    await vi.advanceTimersByTimeAsync(ms)
})

describe('useCheckInInsightsPolling', () => {
    const onReady = vi.fn()
    const onStop = vi.fn()

    beforeEach(() => {
        vi.useFakeTimers()
        vi.clearAllMocks()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('does not poll without a check-in id', async () => {
        renderHook(() => useCheckInInsightsPolling({
            checkInId: null,
            onReady,
            onStop
        }))

        await tick(timings.INSIGHTS_POLL_TIMEOUT)

        expect(fetchCheckIns).not.toHaveBeenCalled()
    })

    it('keeps polling while pending, then reports ready and stops', async () => {
        fetchCheckIns
            .mockResolvedValueOnce([buildCheckIn('pending')])
            .mockResolvedValueOnce([buildCheckIn('ready')])
        renderHook(() => useCheckInInsightsPolling({
            checkInId: 'c1',
            onReady,
            onStop
        }))

        await tick(timings.INSIGHTS_POLL_INTERVAL)
        expect(fetchCheckIns).toHaveBeenCalledWith(1)
        expect(onReady).not.toHaveBeenCalled()

        await tick(timings.INSIGHTS_POLL_INTERVAL)
        expect(onReady).toHaveBeenCalledWith(buildCheckIn('ready'))
        expect(onStop).toHaveBeenCalledTimes(1)

        await tick(timings.INSIGHTS_POLL_TIMEOUT)
        expect(fetchCheckIns).toHaveBeenCalledTimes(2)
    })

    it('ignores a latest check-in with a different id', async () => {
        fetchCheckIns.mockResolvedValue([
            { id: 'other', insightsStatus: 'ready' }
        ])
        renderHook(() => useCheckInInsightsPolling({
            checkInId: 'c1',
            onReady,
            onStop
        }))

        await tick(timings.INSIGHTS_POLL_INTERVAL * 2)

        expect(onReady).not.toHaveBeenCalled()
    })

    it('keeps polling through a failed request', async () => {
        fetchCheckIns
            .mockRejectedValueOnce(new Error('Network Error'))
            .mockResolvedValueOnce([buildCheckIn('ready')])
        renderHook(() => useCheckInInsightsPolling({
            checkInId: 'c1',
            onReady,
            onStop
        }))

        await tick(timings.INSIGHTS_POLL_INTERVAL * 2)

        expect(onReady).toHaveBeenCalledTimes(1)
    })

    it('stops silently after the timeout without reporting ready', async () => {
        fetchCheckIns.mockResolvedValue([buildCheckIn('pending')])
        renderHook(() => useCheckInInsightsPolling({
            checkInId: 'c1',
            onReady,
            onStop
        }))

        await tick(timings.INSIGHTS_POLL_TIMEOUT + timings.INSIGHTS_POLL_INTERVAL)

        expect(onStop).toHaveBeenCalledTimes(1)
        expect(onReady).not.toHaveBeenCalled()
        const calls = fetchCheckIns.mock.calls.length

        await tick(timings.INSIGHTS_POLL_TIMEOUT)
        expect(fetchCheckIns).toHaveBeenCalledTimes(calls)
    })

    it('clears the timer on unmount', async () => {
        fetchCheckIns.mockResolvedValue([buildCheckIn('pending')])
        const { unmount } = renderHook(() => useCheckInInsightsPolling({
            checkInId: 'c1',
            onReady,
            onStop
        }))

        unmount()
        await tick(timings.INSIGHTS_POLL_TIMEOUT)

        expect(fetchCheckIns).not.toHaveBeenCalled()
        expect(onStop).not.toHaveBeenCalled()
    })

    it('drops an in-flight response after unmount', async () => {
        let resolve: (value: CheckIn[]) => void = () => undefined
        fetchCheckIns.mockReturnValue(
            new Promise<CheckIn[]>((r) => { resolve = r })
        )
        const { unmount } = renderHook(() => useCheckInInsightsPolling({
            checkInId: 'c1',
            onReady,
            onStop
        }))

        await tick(timings.INSIGHTS_POLL_INTERVAL)
        unmount()
        await act(async () => resolve([buildCheckIn('ready')]))

        expect(onReady).not.toHaveBeenCalled()
        expect(onStop).not.toHaveBeenCalled()
    })
})
