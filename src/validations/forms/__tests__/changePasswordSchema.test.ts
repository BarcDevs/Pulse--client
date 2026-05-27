import { describe, expect, it } from 'vitest'

import { createChangePasswordSchema } from '@/validations/forms/changePasswordSchema'

import { mockLocales } from './mockLocales'

const schema = createChangePasswordSchema(mockLocales)

describe('createChangePasswordSchema', () => {
    const valid = {
        currentPassword: 'Current@1',
        newPassword: 'NewPass@1',
        confirmPassword: 'NewPass@1'
    }

    it('accepts valid matching passwords', () => {
        expect(schema.safeParse(valid).success).toBe(true)
    })

    it('rejects empty currentPassword', () => {
        const result = schema.safeParse({ ...valid, currentPassword: '' })
        expect(result.success).toBe(false)
    })

    it('rejects empty newPassword', () => {
        const result = schema.safeParse({ ...valid, newPassword: '' })
        expect(result.success).toBe(false)
    })

    it('rejects empty confirmPassword', () => {
        const result = schema.safeParse({ ...valid, confirmPassword: '' })
        expect(result.success).toBe(false)
    })

    it('rejects newPassword shorter than 8 characters', () => {
        const result = schema.safeParse({ ...valid, newPassword: 'Sh@1', confirmPassword: 'Sh@1' })
        expect(result.success).toBe(false)
    })

    it('rejects newPassword without proper format', () => {
        const result = schema.safeParse({
            ...valid,
            newPassword: 'alllowercase',
            confirmPassword: 'alllowercase'
        })
        expect(result.success).toBe(false)
    })

    it('rejects when newPassword and confirmPassword do not match', () => {
        const result = schema.safeParse({ ...valid, confirmPassword: 'Different@1' })
        expect(result.success).toBe(false)
        if (!result.success) {
            const mismatchIssue = result.error.issues.find(
                i => i.message === 'Passwords do not match'
            )
            expect(mismatchIssue).toBeDefined()
        }
    })

    it('sets mismatch error on confirmPassword path', () => {
        const result = schema.safeParse({ ...valid, confirmPassword: 'WrongPass@1' })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(
                result.error.issues.some(i => i.path[0] === 'confirmPassword')
            ).toBe(true)
        }
    })
})
