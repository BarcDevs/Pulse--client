import { describe, expect, it } from 'vitest'

import { otpSchema } from '@/validations/forms/otpSchema'

// ==================== otpSchema ====================
describe('otpSchema',
    () => {
        it(
            'should validate a valid 6-digit numeric OTP',
            () => {
                const result = otpSchema.safeParse({
                    otp: '123456'
                })
                expect(result.success).toBe(true)
            })

        it(
            'should validate a valid 6-character alphanumeric OTP',
            () => {
                const result = otpSchema.safeParse({
                    otp: 'abc123'
                })
                expect(result.success).toBe(true)
            })

        it(
            'should validate a valid 6-character all-letters OTP',
            () => {
                const result = otpSchema.safeParse({
                    otp: 'abcdef'
                })
                expect(result.success).toBe(true)
            })

        it(
            'should validate uppercase letters',
            () => {
                const result = otpSchema.safeParse({
                    otp: 'ABCDEF'
                })
                expect(result.success).toBe(true)
            })

        it(
            'should reject empty OTP with correct message',
            () => {
                const result = otpSchema.safeParse({
                    otp: ''
                })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    expect(result.error.issues[ 0 ].message)
                        .toBe('OTP is required')
                }
            })

        it(
            'should reject OTP shorter than 6 characters',
            () => {
                const result = otpSchema.safeParse({
                    otp: '12345'
                })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    const shortIssue =
                        result.error.issues.find(
                            i => i.message === 'OTP is too short'
                        )
                    expect(shortIssue).toBeDefined()
                }
            })

        it(
            'should reject OTP longer than 6 characters',
            () => {
                const result = otpSchema.safeParse({
                    otp: '1234567'
                })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    const longIssue =
                        result.error.issues.find(
                            i => i.message === 'Invalid OTP'
                        )
                    expect(longIssue).toBeDefined()
                }
            })

        it(
            'should reject OTP with special characters',
            () => {
                const result = otpSchema.safeParse({
                    otp: '12@4$6'
                })
                expect(result.success).toBe(false)
            })

        it(
            'should reject OTP with spaces',
            () => {
                const result = otpSchema.safeParse({
                    otp: '12 456'
                })
                expect(result.success).toBe(false)
            })

        it(
            'should reject missing OTP field',
            () => {
                const result = otpSchema.safeParse({})
                expect(result.success).toBe(false)
            })

        it(
            'should reject OTP with hyphens',
            () => {
                const result = otpSchema.safeParse({
                    otp: '12-456'
                })
                expect(result.success).toBe(false)
            })
    })
