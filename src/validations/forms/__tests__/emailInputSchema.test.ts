import {
    describe,
    expect,
    it
} from 'vitest'

import { emailInputSchema } from '@/validations/forms/emailInputSchema'

// ==================== emailInputSchema ====================
describe(
    'emailInputSchema',
    () => {
        it(
            'should validate a valid email',
            () => {
                const result = emailInputSchema
                    .safeParse({
                        email: 'user@example.com'
                    })
                expect(result.success).toBe(true)
            })

        it(
            'should accept email with subdomain',
            () => {
                const result = emailInputSchema
                    .safeParse({
                        email: 'user@mail.example.com'
                    })
                expect(result.success).toBe(true)
            })

        it(
            'should accept email with plus addressing',
            () => {
                const result = emailInputSchema
                    .safeParse({
                        email: 'user+tag@example.com'
                    })
                expect(result.success).toBe(true)
            })

        it(
            'should accept email with dots in local part',
            () => {
                const result = emailInputSchema
                    .safeParse({
                        email: 'first.last@example.com'
                    })
                expect(result.success).toBe(true)
            })

        it(
            'should reject empty email with correct message',
            () => {
                const result = emailInputSchema
                    .safeParse({
                        email: ''
                    })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    expect(result.error.issues[ 0 ].message)
                        .toBe('Email is required')
                }
            })

        it(
            'should reject invalid email format',
            () => {
                const result = emailInputSchema
                    .safeParse({
                        email: 'not-an-email'
                    })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    expect(result.error.issues[ 0 ].message)
                        .toBe('Invalid email')
                }
            })

        it(
            'should reject email without domain',
            () => {
                const result = emailInputSchema
                    .safeParse({
                        email: 'user@'
                    })
                expect(result.success).toBe(false)
            })

        it(
            'should reject email without @ symbol',
            () => {
                const result = emailInputSchema
                    .safeParse({
                        email: 'user.example.com'
                    })
                expect(result.success).toBe(false)
            })

        it(
            'should reject email with spaces',
            () => {
                const result = emailInputSchema
                    .safeParse({
                        email: 'user @example.com'
                    })
                expect(result.success).toBe(false)
            })

        it(
            'should reject missing email field',
            () => {
                const result = emailInputSchema
                    .safeParse({})
                expect(result.success).toBe(false)
            })
    })
