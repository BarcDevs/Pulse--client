import {
    describe,
    expect,
    it
} from 'vitest'

import { createCheckInSchema } from '@/validations/forms/checkInSchema'

import { mockLocales } from './mockLocales'

const schema = createCheckInSchema(mockLocales)

describe('createCheckInSchema', () => {
    const valid = {
        moodScore: 5,
        painLevel: 5,
        activities: ['walking'],
        notes: 'Feeling good'
    }

    it('accepts valid check-in data', () => {
        expect(schema.safeParse(valid).success).toBe(true)
    })

    it('accepts boundary moodScore of 1', () => {
        expect(schema.safeParse({ ...valid, moodScore: 1 }).success).toBe(true)
    })

    it('accepts boundary moodScore of 10', () => {
        expect(schema.safeParse({ ...valid, moodScore: 10 }).success).toBe(true)
    })

    it('rejects moodScore below 1', () => {
        expect(schema.safeParse({ ...valid, moodScore: 0 }).success).toBe(false)
    })

    it('rejects moodScore above 10', () => {
        expect(schema.safeParse({ ...valid, moodScore: 11 }).success).toBe(false)
    })

    it('accepts boundary painLevel of 1', () => {
        expect(schema.safeParse({ ...valid, painLevel: 1 }).success).toBe(true)
    })

    it('accepts boundary painLevel of 10', () => {
        expect(schema.safeParse({ ...valid, painLevel: 10 }).success).toBe(true)
    })

    it('rejects painLevel below 1', () => {
        expect(schema.safeParse({ ...valid, painLevel: 0 }).success).toBe(false)
    })

    it('rejects painLevel above 10', () => {
        expect(schema.safeParse({ ...valid, painLevel: 11 }).success).toBe(false)
    })

    it('accepts empty activities array (minCount is 0)', () => {
        expect(schema.safeParse({ ...valid, activities: [] }).success).toBe(true)
    })

    it('rejects activity with empty string', () => {
        expect(schema.safeParse({ ...valid, activities: [''] }).success).toBe(false)
    })

    it('rejects activity string exceeding 100 chars', () => {
        expect(
            schema.safeParse({ ...valid, activities: ['a'.repeat(101)] }).success
        ).toBe(false)
    })

    it('accepts notes at max length (500)', () => {
        expect(schema.safeParse({ ...valid, notes: 'a'.repeat(500) }).success).toBe(true)
    })

    it('rejects notes exceeding 500 chars', () => {
        expect(schema.safeParse({ ...valid, notes: 'a'.repeat(501) }).success).toBe(false)
    })

    it('accepts without notes (optional)', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { notes: _notes, ...rest } = valid
        expect(schema.safeParse(rest).success).toBe(true)
    })
})
