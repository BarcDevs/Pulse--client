import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

vi.mock(
    'axios',
    () => ( {
        default: { isAxiosError: vi.fn() }
    } ))

import axios from 'axios'

import { wrapFormSubmit } from '@/lib/forms/handleFormSubmit'

const mockForm = {
    handleSubmit: vi.fn((handler) => handler),
    reset: vi.fn(),
    setError: vi.fn()
} as any

// ==================== wrapFormSubmit ====================
describe(
    'wrapFormSubmit',
    () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        // ==================== successful submit ====================
        describe(
            'successful submit',
            () => {
                it(
                    'should call onSubmit and not call setError on success',
                    async () => {
                        const onSubmit = vi.fn().mockResolvedValueOnce(undefined)
                        const handler = wrapFormSubmit(mockForm, onSubmit)
                        await handler({ name: 'test' })

                        expect(onSubmit).toHaveBeenCalledWith({ name: 'test' })
                        expect(mockForm.setError).not.toHaveBeenCalled()
                    })

                it(
                    'should call form.reset when resetOnSuccess is true',
                    async () => {
                        const onSubmit = vi.fn().mockResolvedValueOnce(undefined)
                        const handler = wrapFormSubmit(mockForm, onSubmit, { resetOnSuccess: true })
                        await handler({})

                        expect(mockForm.reset).toHaveBeenCalled()
                    })

                it(
                    'should NOT call form.reset when resetOnSuccess is false',
                    async () => {
                        const onSubmit = vi.fn().mockResolvedValueOnce(undefined)
                        const handler = wrapFormSubmit(mockForm, onSubmit, { resetOnSuccess: false })
                        await handler({})

                        expect(mockForm.reset).not.toHaveBeenCalled()
                    })
            })

        // ==================== axios error ====================
        describe(
            'axios error',
            () => {
                it(
                    'should call setError with response.data.message when present',
                    async () => {
                        const axiosError = { response: { data: { message: 'Conflict error' } } }
                        vi.mocked(axios.isAxiosError).mockReturnValueOnce(true)
                        const onSubmit = vi.fn().mockRejectedValueOnce(axiosError)
                        const handler = wrapFormSubmit(mockForm, onSubmit)
                        await handler({})

                        expect(mockForm.setError).toHaveBeenCalledWith('root', {
                            type: 'manual',
                            message: 'Conflict error'
                        })
                    })

                it(
                    'should call setError with fallbackMessage when response.data.message is absent',
                    async () => {
                        const axiosError = { response: { data: {} } }
                        vi.mocked(axios.isAxiosError).mockReturnValueOnce(true)
                        const onSubmit = vi.fn().mockRejectedValueOnce(axiosError)
                        const handler = wrapFormSubmit(mockForm, onSubmit, { fallbackMessage: 'Custom fallback' })
                        await handler({})

                        expect(mockForm.setError).toHaveBeenCalledWith('root', {
                            type: 'manual',
                            message: 'Custom fallback'
                        })
                    })

                it(
                    'should call setError with "Submission failed" when no message or fallback',
                    async () => {
                        const axiosError = { response: { data: {} } }
                        vi.mocked(axios.isAxiosError).mockReturnValueOnce(true)
                        const onSubmit = vi.fn().mockRejectedValueOnce(axiosError)
                        const handler = wrapFormSubmit(mockForm, onSubmit)
                        await handler({})

                        expect(mockForm.setError).toHaveBeenCalledWith('root', {
                            type: 'manual',
                            message: 'Submission failed'
                        })
                    })
            })

        // ==================== Error instance ====================
        describe(
            'Error instance',
            () => {
                it(
                    'should call setError with error.message for an Error instance',
                    async () => {
                        vi.mocked(axios.isAxiosError).mockReturnValueOnce(false)
                        const onSubmit = vi.fn().mockRejectedValueOnce(new Error('native error'))
                        const handler = wrapFormSubmit(mockForm, onSubmit)
                        await handler({})

                        expect(mockForm.setError).toHaveBeenCalledWith('root', {
                            type: 'manual',
                            message: 'native error'
                        })
                    })
            })

        // ==================== unknown error ====================
        describe(
            'unknown error',
            () => {
                it(
                    'should call setError with fallbackMessage for an unknown error',
                    async () => {
                        vi.mocked(axios.isAxiosError).mockReturnValueOnce(false)
                        const onSubmit = vi.fn().mockRejectedValueOnce('just a string')
                        const handler = wrapFormSubmit(mockForm, onSubmit, { fallbackMessage: 'Custom fallback' })
                        await handler({})

                        expect(mockForm.setError).toHaveBeenCalledWith('root', {
                            type: 'manual',
                            message: 'Custom fallback'
                        })
                    })

                it(
                    'should call setError with "Submission failed" for an unknown error without fallback',
                    async () => {
                        vi.mocked(axios.isAxiosError).mockReturnValueOnce(false)
                        const onSubmit = vi.fn().mockRejectedValueOnce('just a string')
                        const handler = wrapFormSubmit(mockForm, onSubmit)
                        await handler({})

                        expect(mockForm.setError).toHaveBeenCalledWith('root', {
                            type: 'manual',
                            message: 'Submission failed'
                        })
                    })
            })
    })
