import { AxiosError } from 'axios'
import {
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

import { getErrorMessage } from '@/lib/errors'

// ==================== getErrorMessage ====================
describe(
    'getErrorMessage',
    () => {
        beforeEach(() => {
            vi.clearAllMocks()
        })

        // ==================== AxiosError branches ====================
        describe(
            'AxiosError',
            () => {
                it(
                    'should return data.error when present',
                    () => {
                        const axiosErr = new AxiosError('msg')
                        axiosErr.response = { status: 400, data: { error: 'Bad input' } } as any

                        expect(getErrorMessage(axiosErr)).toBe('Bad input')
                    })

                it(
                    'should return data.message when data.error is absent',
                    () => {
                        const axiosErr = new AxiosError('msg')
                        axiosErr.response = { status: 400, data: { message: 'Invalid data' } } as any

                        expect(getErrorMessage(axiosErr)).toBe('Invalid data')
                    })

                it(
                    'should return mapped message for status 400',
                    () => {
                        const axiosErr = new AxiosError('msg')
                        axiosErr.response = { status: 400, data: {} } as any

                        expect(getErrorMessage(axiosErr)).toBe('Invalid request. Please check your input.')
                    })

                it(
                    'should return mapped message for status 401',
                    () => {
                        const axiosErr = new AxiosError('msg')
                        axiosErr.response = { status: 401, data: {} } as any

                        expect(getErrorMessage(axiosErr)).toBe('You are not authenticated. Please log in.')
                    })

                it(
                    'should return mapped message for status 404',
                    () => {
                        const axiosErr = new AxiosError('msg')
                        axiosErr.response = { status: 404, data: {} } as any

                        expect(getErrorMessage(axiosErr)).toBe('The requested resource was not found.')
                    })

                it(
                    'should return mapped message for status 500',
                    () => {
                        const axiosErr = new AxiosError('msg')
                        axiosErr.response = { status: 500, data: {} } as any

                        expect(getErrorMessage(axiosErr)).toBe('Server error. Please try again later.')
                    })

                it(
                    'should return generic message for unknown status 418',
                    () => {
                        const axiosErr = new AxiosError('msg')
                        axiosErr.response = { status: 418, data: {} } as any

                        expect(getErrorMessage(axiosErr)).toBe('An error occurred. Please try again.')
                    })

                it(
                    'should return network error message when there is no response',
                    () => {
                        const axiosErr = new AxiosError('msg')

                        expect(getErrorMessage(axiosErr)).toBe('Network error. Please check your connection.')
                    })
            })

        // ==================== non-Axios branches ====================
        describe(
            'non-Axios errors',
            () => {
                it(
                    'should return error.message for an Error instance',
                    () => {
                        const err = new Error('something broke')

                        expect(getErrorMessage(err)).toBe('something broke')
                    })

                it(
                    'should return the string when error is a string',
                    () => {
                        expect(getErrorMessage('plain string error')).toBe('plain string error')
                    })

                it(
                    'should return generic fallback for null',
                    () => {
                        expect(getErrorMessage(null)).toBe('An unexpected error occurred. Please try again.')
                    })

                it(
                    'should return generic fallback for unknown object',
                    () => {
                        expect(getErrorMessage({ weird: true })).toBe('An unexpected error occurred. Please try again.')
                    })
            })
    })
