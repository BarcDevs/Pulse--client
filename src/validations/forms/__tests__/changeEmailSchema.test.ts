import { describe, expect, it } from 'vitest'

import { createChangeEmailSchema } from '@/validations/forms/changeEmailSchema'

import { mockLocales } from './mockLocales'

const schema = createChangeEmailSchema(mockLocales)

describe('createChangeEmailSchema', () => {
    const valid = {
        newEmail: 'new@example.com',
        password: 'Password@1'
    }

    it('accepts valid data', () => {
        expect(schema.safeParse(valid).success).toBe(true)
    })

    it('rejects empty newEmail with required message', () => {
        const result = schema.safeParse({ ...valid, newEmail: '' })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('Email is required')
        }
    })

    it('rejects invalid email format', () => {
        expect(schema.safeParse({ ...valid, newEmail: 'not-an-email' }).success).toBe(false)
    })

    it('rejects empty password', () => {
        expect(schema.safeParse({ ...valid, password: '' }).success).toBe(false)
    })

    it('rejects password shorter than 8 characters', () => {
        expect(schema.safeParse({ ...valid, password: 'Sh@1' }).success).toBe(false)
    })

    it('rejects password without proper format (letters and numbers required)', () => {
        expect(schema.safeParse({ ...valid, password: 'alllowercase' }).success).toBe(false)
    })
})
