import { describe, expect, it } from 'vitest'

import { createBasicInfoSchema } from '@/validations/forms/basicInfoSchema'

import { mockLocales } from './mockLocales'

const schema = createBasicInfoSchema(mockLocales)

describe('createBasicInfoSchema', () => {
    it('accepts empty object (all fields optional)', () => {
        expect(schema.safeParse({}).success).toBe(true)
    })

    it('accepts valid full data', () => {
        expect(schema.safeParse({
            firstName: 'John',
            lastName: 'Doe',
            location: 'Tel Aviv'
        }).success).toBe(true)
    })

    it('rejects firstName as empty string when provided', () => {
        expect(schema.safeParse({ firstName: '' }).success).toBe(false)
    })

    it('rejects firstName exceeding 100 chars', () => {
        expect(schema.safeParse({ firstName: 'a'.repeat(101) }).success).toBe(false)
    })

    it('rejects lastName as empty string when provided', () => {
        expect(schema.safeParse({ lastName: '' }).success).toBe(false)
    })

    it('rejects lastName exceeding 100 chars', () => {
        expect(schema.safeParse({ lastName: 'a'.repeat(101) }).success).toBe(false)
    })

    it('accepts location at exactly 100 chars', () => {
        expect(schema.safeParse({ location: 'a'.repeat(100) }).success).toBe(true)
    })

    it('rejects location exceeding 100 chars', () => {
        expect(schema.safeParse({ location: 'a'.repeat(101) }).success).toBe(false)
    })
})
