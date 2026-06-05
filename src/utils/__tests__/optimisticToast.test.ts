import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

import { toast } from 'sonner'

import { withOptimisticToast } from '@/utils/optimisticToast'

const make401Error = () =>
    Object.assign(new Error('Unauthorized'), {
        response: { status: 401 }
    })

const makeGenericError = () => new Error('Something went wrong')

describe('withOptimisticToast', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('successful action', () => {
        it('calls onSuccess before showing success toast', async () => {
            const callOrder: string[] = []
            const onSuccess = vi.fn(() => {
                callOrder.push('onSuccess')
            })
            vi.mocked(toast.success).mockImplementation(() => {
                callOrder.push('toast')
                return 'id'
            })

            await withOptimisticToast({
                action: Promise.resolve(),
                successMsg: 'Done',
                errorMsg: 'Failed',
                retryLabel: 'Retry',
                onRetry: vi.fn(),
                onSuccess
            })

            expect(callOrder).toEqual(['onSuccess', 'toast'])
        })

        it('shows success toast when action resolves', async () => {
            await withOptimisticToast({
                action: Promise.resolve(),
                successMsg: 'Saved!',
                errorMsg: 'Failed',
                retryLabel: 'Retry',
                onRetry: vi.fn()
            })

            expect(toast.success).toHaveBeenCalledWith(
                'Saved!',
                expect.any(Object)
            )
        })
    })

    describe('401 unauthorized error', () => {
        it('calls onUnauthorized instead of showing generic error toast', async () => {
            const onUnauthorized = vi.fn()

            await withOptimisticToast({
                action: Promise.reject(make401Error()),
                successMsg: 'Done',
                errorMsg: 'Failed',
                retryLabel: 'Retry',
                onRetry: vi.fn(),
                onUnauthorized
            })

            expect(onUnauthorized).toHaveBeenCalledOnce()
            expect(toast.error).not.toHaveBeenCalled()
        })

        it('calls onError for optimistic rollback even on 401', async () => {
            const onError = vi.fn()
            const onUnauthorized = vi.fn()

            await withOptimisticToast({
                action: Promise.reject(make401Error()),
                successMsg: 'Done',
                errorMsg: 'Failed',
                retryLabel: 'Retry',
                onRetry: vi.fn(),
                onError,
                onUnauthorized
            })

            expect(onError).toHaveBeenCalledOnce()
        })

        it('falls back to generic error toast on 401 when no onUnauthorized provided', async () => {
            await withOptimisticToast({
                action: Promise.reject(make401Error()),
                successMsg: 'Done',
                errorMsg: 'Oops',
                retryLabel: 'Retry',
                onRetry: vi.fn()
            })

            expect(toast.error).toHaveBeenCalledWith(
                'Oops',
                expect.any(Object)
            )
        })
    })

    describe('generic error', () => {
        it('shows error toast and does not call onUnauthorized', async () => {
            const onUnauthorized = vi.fn()

            await withOptimisticToast({
                action: Promise.reject(makeGenericError()),
                successMsg: 'Done',
                errorMsg: 'Oops',
                retryLabel: 'Retry',
                onRetry: vi.fn(),
                onUnauthorized
            })

            expect(toast.error).toHaveBeenCalledWith(
                'Oops',
                expect.any(Object)
            )
            expect(onUnauthorized).not.toHaveBeenCalled()
        })

        it('calls onError for rollback on generic error', async () => {
            const onError = vi.fn()

            await withOptimisticToast({
                action: Promise.reject(makeGenericError()),
                successMsg: 'Done',
                errorMsg: 'Oops',
                retryLabel: 'Retry',
                onRetry: vi.fn(),
                onError
            })

            expect(onError).toHaveBeenCalledOnce()
        })
    })
})
