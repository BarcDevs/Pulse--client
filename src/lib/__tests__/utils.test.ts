import { describe, expect, it } from 'vitest'

import { getUserFallback } from '@/lib/utils'

// ==================== getUserFallback ====================
describe(
    'getUserFallback',
    () => {
        it(
            'should return uppercase initials from first and last name',
            () => {
                expect(getUserFallback(
                    'John',
                    'Doe'
                )).toBe('JD')
            })

        it(
            'should handle lowercase names',
            () => {
                expect(getUserFallback(
                    'john',
                    'doe'
                )).toBe('JD')
            })

        it(
            'should handle already uppercase names',
            () => {
                expect(getUserFallback(
                    'JOHN',
                    'DOE'
                )).toBe('JD')
            })

        it(
            'should handle mixed case names',
            () => {
                expect(getUserFallback(
                    'jAnE',
                    'sMiTh'
                )).toBe('JS')
            })

        it(
            'should handle single character names',
            () => {
                expect(getUserFallback(
                    'A',
                    'B'
                )).toBe('AB')
            })

        it(
            'should return empty string for empty inputs',
            () => {
                expect(getUserFallback(
                    '',
                    ''
                )).toBe('')
            })
    })
