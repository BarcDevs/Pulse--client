import {
    describe,
    expect,
    it
} from 'vitest'

import { createProfileUpdateSchema } from '@/validations/forms/profileSchema'

import { mockLocales } from './mockLocales'

const schema = createProfileUpdateSchema(mockLocales)

describe('createProfileUpdateSchema', () => {
    it('accepts empty object (all fields optional)', () => {
        expect(schema.safeParse({}).success).toBe(true)
    })

    it('accepts valid full data', () => {
        expect(schema.safeParse({
            bio: 'I am recovering from an injury',
            location: 'Tel Aviv',
            timezone: 'Asia/Jerusalem'
        }).success).toBe(true)
    })

    it('accepts bio at exactly 500 chars', () => {
        expect(schema.safeParse({ bio: 'a'.repeat(500) }).success).toBe(true)
    })

    it('rejects bio exceeding 500 chars', () => {
        expect(schema.safeParse({ bio: 'a'.repeat(501) }).success).toBe(false)
    })

    it('accepts location at exactly 100 chars', () => {
        expect(schema.safeParse({ location: 'a'.repeat(100) }).success).toBe(true)
    })

    it('rejects location exceeding 100 chars', () => {
        expect(schema.safeParse({ location: 'a'.repeat(101) }).success).toBe(false)
    })

    it('accepts any string for timezone', () => {
        expect(schema.safeParse({ timezone: 'America/New_York' }).success).toBe(true)
    })
})
