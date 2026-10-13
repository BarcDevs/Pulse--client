import { describe, expect, it } from 'vitest'

import { isCursorNotFoundError } from '@/utils/error'

const apiError = (
    status: number,
    message: string
) => ({ response: { status, data: { message } } })

describe('isCursorNotFoundError', () => {
    it('matches the 404 Cursor not found answer', () => {
        expect(isCursorNotFoundError(apiError(404, 'Cursor not found')))
            .toBe(true)
    })

    it('does not match another 404 such as a missing post', () => {
        expect(isCursorNotFoundError(apiError(404, 'Post not found')))
            .toBe(false)
    })

    it('does not match the same message with another status', () => {
        expect(isCursorNotFoundError(apiError(400, 'Cursor not found')))
            .toBe(false)
    })

    it('does not match a missing error or a plain Error', () => {
        expect(isCursorNotFoundError(null)).toBe(false)
        expect(isCursorNotFoundError(new Error('Cursor not found')))
            .toBe(false)
    })
})
