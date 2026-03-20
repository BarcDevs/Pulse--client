import { describe, expect, it } from 'vitest'

import { loginSchema } from '@/validations/forms/loginSchema'

// ==================== loginSchema ====================
describe('loginSchema',
    () => {
        const validLogin = {
            email: 'user@example.com',
            password: 'Test@1234',
            remember: false
        }

        it(
            'should validate valid login credentials',
            () => {
                const result =
                    loginSchema.safeParse(validLogin)
                expect(result.success).toBe(true)
            })

        it(
            'should accept remember as true',
            () => {
                const result =
                    loginSchema.safeParse({
                        ...validLogin,
                        remember: true
                    })
                expect(result.success).toBe(true)
            })

        it(
            'should reject empty email with correct message',
            () => {
                const result = loginSchema.safeParse({
                    ...validLogin,
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
                const result = loginSchema.safeParse({
                    ...validLogin,
                    email: 'not-valid'
                })
                expect(result.success).toBe(false)
            })

        it(
            'should reject empty password with correct message',
            () => {
                const result = loginSchema.safeParse({
                    ...validLogin,
                    password: ''
                })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    expect(result.error.issues[ 0 ].message)
                        .toBe('Password is required')
                }
            })

        it(
            'should reject password shorter than 8 characters',
            () => {
                const result = loginSchema.safeParse({
                    ...validLogin,
                    password: 'Ab1@xyz'
                })
                expect(result.success).toBe(false)
            })

        it(
            'should reject password without number',
            () => {
                const result = loginSchema.safeParse({
                    ...validLogin,
                    password: 'Test@abcd'
                })
                expect(result.success).toBe(false)
            })

        it(
            'should show format message for invalid password',
            () => {
                const result = loginSchema.safeParse({
                    ...validLogin,
                    password: 'alllowercase'
                })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    const formatIssue =
                        result.error.issues.find(
                            i => i.message.includes(
                                'contain letters and numbers'
                            )
                        )
                    expect(formatIssue).toBeDefined()
                }
            })

        it(
            'should reject missing remember field',
            () => {
                const result = loginSchema.safeParse({
                    email: validLogin.email,
                    password: validLogin.password
                })
                expect(result.success).toBe(false)
            })

        it(
            'should accept a complex valid password',
            () => {
                const result = loginSchema.safeParse({
                    ...validLogin,
                    password: 'C0mpl3x!Pass'
                })
                expect(result.success).toBe(true)
            })
    })
