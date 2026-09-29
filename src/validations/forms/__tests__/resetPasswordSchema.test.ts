import {
    describe,
    expect,
    it
} from 'vitest'

import { createResetPasswordSchema } from '@/validations/forms/resetPasswordSchema'

import { mockLocales } from './mockLocales'

const resetPasswordSchema = createResetPasswordSchema(mockLocales)

const valid = {
    otp: '123456',
    password: 'Password123',
    confirmPassword: 'Password123'
}

// ==================== resetPasswordSchema ====================
describe('resetPasswordSchema', () => {
    it('should accept a 6-digit code and matching valid passwords', () => {
        expect(resetPasswordSchema.safeParse(valid).success).toBe(true)
    })

    it('should reject a missing code', () => {
        expect(resetPasswordSchema.safeParse({ ...valid, otp: '' }).success)
            .toBe(false)
    })

    it('should reject a non-numeric code', () => {
        expect(resetPasswordSchema.safeParse({ ...valid, otp: 'abcdef' }).success)
            .toBe(false)
    })

    it('should reject mismatched passwords on confirmPassword', () => {
        const result = resetPasswordSchema.safeParse({
            ...valid,
            confirmPassword: 'Different123'
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].path).toEqual(['confirmPassword'])
            expect(result.error.issues[0].message)
                .toBe('Passwords do not match')
        }
    })

    it('should reject a password that fails the password rules', () => {
        expect(resetPasswordSchema.safeParse({
            ...valid,
            password: 'short',
            confirmPassword: 'short'
        }).success).toBe(false)
    })
})
