import { describe, expect, it } from 'vitest'

import { isCursorNotFoundError } from '@/utils/error'

const apiError = (
    status: number,
    code: string,
    resource: string
) => ({
    response: {
        status,
        data: {
            message: `${resource} not found! please check your inputs and try again!`,
            error: [{ code, params: { resource } }]
        }
    }
})

describe('isCursorNotFoundError', () => {
    it('matches the 404 NOT_FOUND answer for the Cursor resource', () => {
        expect(isCursorNotFoundError(apiError(404, 'NOT_FOUND', 'Cursor')))
            .toBe(true)
    })

    it('does not match another resource such as a missing post', () => {
        expect(isCursorNotFoundError(apiError(404, 'NOT_FOUND', 'Post')))
            .toBe(false)
    })

    it('does not match the same detail with another status', () => {
        expect(isCursorNotFoundError(apiError(400, 'NOT_FOUND', 'Cursor')))
            .toBe(false)
    })

    it('does not depend on the translated message text', () => {
        const error = apiError(404, 'NOT_FOUND', 'Cursor')
        error.response.data.message = 'הסמן לא נמצא'

        expect(isCursorNotFoundError(error)).toBe(true)
    })

    it('does not match a missing error or a plain Error', () => {
        expect(isCursorNotFoundError(null)).toBe(false)
        expect(isCursorNotFoundError(new Error('Cursor not found')))
            .toBe(false)
    })
})
