import {
    describe,
    expect,
    it
} from 'vitest'

import { createProfileEditSchema } from '@/validations/forms/profileEditSchema'

import { mockLocales } from './mockLocales'

const schema = createProfileEditSchema(mockLocales)

describe('createProfileEditSchema', () => {
    it('accepts empty object (all fields optional)', () => {
        expect(schema.safeParse({}).success).toBe(true)
    })

    it('accepts valid full data', () => {
        expect(schema.safeParse({
            username: 'john_doe',
            firstName: 'John',
            lastName: 'Doe',
            location: 'Tel Aviv',
            bio: 'Recovery is a journey'
        }).success).toBe(true)
    })

    describe('username', () => {
        it('rejects empty string', () => {
            expect(schema.safeParse({ username: '' }).success).toBe(false)
        })

        it('rejects username shorter than 3 chars', () => {
            expect(schema.safeParse({ username: 'ab' }).success).toBe(false)
        })

        it('accepts username at min length (3)', () => {
            expect(schema.safeParse({ username: 'abc' }).success).toBe(true)
        })

        it('rejects username longer than 30 chars', () => {
            expect(schema.safeParse({ username: 'a'.repeat(31) }).success).toBe(false)
        })

        it('accepts username at max length (30)', () => {
            expect(schema.safeParse({ username: 'a'.repeat(30) }).success).toBe(true)
        })

        it('rejects username with special characters', () => {
            expect(schema.safeParse({ username: 'john doe' }).success).toBe(false)
            expect(schema.safeParse({ username: 'john@doe' }).success).toBe(false)
        })

        it('accepts username with underscores and numbers', () => {
            expect(schema.safeParse({ username: 'john_doe99' }).success).toBe(true)
        })
    })

    describe('firstName', () => {
        it('rejects empty string', () => {
            expect(schema.safeParse({ firstName: '' }).success).toBe(false)
        })

        it('rejects firstName longer than 100 chars', () => {
            expect(schema.safeParse({ firstName: 'a'.repeat(101) }).success).toBe(false)
        })

        it('accepts firstName at max length (100)', () => {
            expect(schema.safeParse({ firstName: 'a'.repeat(100) }).success).toBe(true)
        })
    })

    describe('lastName', () => {
        it('rejects empty string', () => {
            expect(schema.safeParse({ lastName: '' }).success).toBe(false)
        })

        it('rejects lastName longer than 100 chars', () => {
            expect(schema.safeParse({ lastName: 'a'.repeat(101) }).success).toBe(false)
        })
    })

    describe('location', () => {
        it('rejects location longer than 100 chars', () => {
            expect(schema.safeParse({ location: 'a'.repeat(101) }).success).toBe(false)
        })

        it('accepts location at max length (100)', () => {
            expect(schema.safeParse({ location: 'a'.repeat(100) }).success).toBe(true)
        })
    })

    describe('bio', () => {
        it('rejects bio longer than 500 chars', () => {
            expect(schema.safeParse({ bio: 'a'.repeat(501) }).success).toBe(false)
        })

        it('accepts bio at max length (500)', () => {
            expect(schema.safeParse({ bio: 'a'.repeat(500) }).success).toBe(true)
        })
    })
})
