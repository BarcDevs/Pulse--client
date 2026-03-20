import { describe, expect, it } from 'vitest'

import { signupSchema } from '@/validations/forms/signupSchema'

// ==================== signupSchema ====================
describe(
    'signupSchema',
    () => {
        const validSignup = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'Test@1234',
            confirmPassword: 'Test@1234'
        }

        it(
            'should validate valid signup data',
            () => {
                const result = signupSchema
                    .safeParse(validSignup)
                expect(result.success).toBe(true)
            })

        it(
            'should reject first name shorter than 2 chars',
            () => {
                const result = signupSchema
                    .safeParse({
                        ...validSignup,
                        firstName: 'J'
                    })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    expect(result.error.issues[ 0 ].message)
                        .toBe('First name is required')
                }
            })

        it(
            'should reject empty first name',
            () => {
                const result = signupSchema
                    .safeParse({
                        ...validSignup,
                        firstName: ''
                    })
                expect(result.success).toBe(false)
            })

        it(
            'should reject last name shorter than 2 chars',
            () => {
                const result = signupSchema
                    .safeParse({
                        ...validSignup,
                        lastName: 'D'
                    })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    expect(result.error.issues[ 0 ].message)
                        .toBe('Last name is required')
                }
            })

        it(
            'should reject empty email',
            () => {
                const result = signupSchema
                    .safeParse({
                        ...validSignup,
                        email: ''
                    })
                expect(result.success).toBe(false)
            })

        it(
            'should reject invalid email format',
            () => {
                const result = signupSchema
                    .safeParse({
                        ...validSignup,
                        email: 'not-email'
                    })
                expect(result.success).toBe(false)
            })

        it(
            'should reject weak password (too short)',
            () => {
                const result = signupSchema
                    .safeParse({
                        ...validSignup,
                        password: 'Ab1@',
                        confirmPassword: 'Ab1@'
                    })
                expect(result.success).toBe(false)
            })

        it(
            'should reject mismatched passwords',
            () => {
                const result = signupSchema
                    .safeParse({
                        ...validSignup,
                        confirmPassword: 'Different@1234'
                    })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    const mismatchIssue =
                        result.error.issues.find(
                            i => i.message ===
                                'Passwords do not match'
                        )
                    expect(mismatchIssue).toBeDefined()
                }
            })

        it(
            'should set mismatch error on confirmPassword path',
            () => {
                const result = signupSchema
                    .safeParse({
                        ...validSignup,
                        confirmPassword: 'Different@1234'
                    })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    const mismatchIssue =
                        result.error.issues.find(
                            i => i.message ===
                                'Passwords do not match'
                        )
                    expect(mismatchIssue?.path)
                        .toContain('confirmPassword')
                }
            })

        it(
            'should reject empty confirm password',
            () => {
                const result = signupSchema
                    .safeParse({
                        ...validSignup,
                        confirmPassword: ''
                    })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    const emptyIssue =
                        result.error.issues.find(
                            i => i.message ===
                                'Confirm password is required'
                        )
                    expect(emptyIssue).toBeDefined()
                }
            })

        it(
            'should accept valid complex password',
            () => {
                const result = signupSchema
                    .safeParse({
                        ...validSignup,
                        password: 'C0mpl3x!Pass',
                        confirmPassword: 'C0mpl3x!Pass'
                    })
                expect(result.success).toBe(true)
            })

        it(
            'should reject missing fields',
            () => {
                const result = signupSchema
                    .safeParse({})
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    expect(result.error.issues.length)
                        .toBeGreaterThan(0)
                }
            })
    })
