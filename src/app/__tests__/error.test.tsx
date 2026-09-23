import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { act, render } from '@testing-library/react'

import { timings } from '@/config/timings'

import ErrorPage from '@/app/error'

const setNetworkError = vi.fn()

vi.mock('@/context/AuthContext', () => ({
    useAuth: () => ({ setNetworkError })
}))

vi.mock('@/components/shared/error/ErrorPageContent', () => ({
    ErrorPageContent: () => <div data-testid={'error-content'}/>
}))

const networkError = Object.assign(new Error('Network Error'), {
    code: 'ERR_NETWORK'
})

describe('app/error boundary while offline', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        setNetworkError.mockClear()
    })

    it('retries once per NETWORK_RETRY_DELAY, never in a tight loop', () => {
        const reset = vi.fn()
        render(<ErrorPage error={networkError} reset={reset}/>)

        act(() => {
            vi.advanceTimersByTime(timings.NETWORK_RETRY_DELAY - 1)
        })
        expect(reset).not.toHaveBeenCalled()

        act(() => {
            vi.advanceTimersByTime(1)
        })
        expect(reset).toHaveBeenCalledTimes(1)
    })

    it('shows the network bar instead of the error page', () => {
        const { queryByTestId } = render(
            <ErrorPage error={networkError} reset={vi.fn()}/>
        )
        expect(setNetworkError).toHaveBeenCalledWith(networkError)
        expect(queryByTestId('error-content')).toBeNull()
    })

    it('does not schedule retries for non-network errors', () => {
        const reset = vi.fn()
        const { getByTestId } = render(
            <ErrorPage error={new Error('boom')} reset={reset}/>
        )
        act(() => {
            vi.advanceTimersByTime(timings.NETWORK_RETRY_DELAY * 3)
        })
        expect(reset).not.toHaveBeenCalled()
        expect(getByTestId('error-content')).toBeTruthy()
    })
})
