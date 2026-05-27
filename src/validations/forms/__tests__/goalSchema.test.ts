import { afterEach, describe, expect, it, vi } from 'vitest'

import { GoalCategory } from '@/types/goals'

import { createGoalSchema, createMilestoneSchema } from '@/validations/forms/goalSchema'

import { mockLocales } from './mockLocales'

afterEach(() => {
    vi.useRealTimers()
})

// ==================== createGoalSchema ====================
describe('createGoalSchema', () => {
    const schema = createGoalSchema(mockLocales)

    const valid = {
        title: 'Walk daily',
        category: GoalCategory.PHYSICAL
    }

    it('accepts valid goal data', () => {
        expect(schema.safeParse(valid).success).toBe(true)
    })

    it('rejects empty title', () => {
        expect(schema.safeParse({ ...valid, title: '' }).success).toBe(false)
    })

    it('rejects title exceeding 100 chars', () => {
        expect(schema.safeParse({ ...valid, title: 'a'.repeat(101) }).success).toBe(false)
    })

    it('accepts description as optional', () => {
        expect(schema.safeParse(valid).success).toBe(true)
    })

    it('rejects description exceeding 500 chars', () => {
        expect(
            schema.safeParse({ ...valid, description: 'a'.repeat(501) }).success
        ).toBe(false)
    })

    it('accepts all valid GoalCategory values', () => {
        for (const cat of Object.values(GoalCategory)) {
            expect(schema.safeParse({ ...valid, category: cat }).success).toBe(true)
        }
    })

    it('rejects invalid category', () => {
        expect(schema.safeParse({ ...valid, category: 'INVALID' }).success).toBe(false)
    })

    it('accepts without targetDate (optional)', () => {
        expect(schema.safeParse(valid).success).toBe(true)
    })

    it('accepts future targetDate', () => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2024-01-01T12:00:00Z'))
        expect(schema.safeParse({ ...valid, targetDate: '2024-06-01' }).success).toBe(true)
    })

    it('rejects past targetDate', () => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2024-06-01T12:00:00Z'))
        expect(schema.safeParse({ ...valid, targetDate: '2024-01-01' }).success).toBe(false)
    })

    it('accepts empty string targetDate (treated as falsy — refine passes)', () => {
        expect(schema.safeParse({ ...valid, targetDate: '' }).success).toBe(true)
    })
})

// ==================== createMilestoneSchema ====================
describe('createMilestoneSchema', () => {
    const schema = createMilestoneSchema(mockLocales)

    const valid = { title: 'First milestone' }

    it('accepts valid milestone data', () => {
        expect(schema.safeParse(valid).success).toBe(true)
    })

    it('rejects empty title', () => {
        expect(schema.safeParse({ title: '' }).success).toBe(false)
    })

    it('rejects title exceeding 100 chars', () => {
        expect(schema.safeParse({ title: 'a'.repeat(101) }).success).toBe(false)
    })

    it('accepts description as optional', () => {
        expect(schema.safeParse(valid).success).toBe(true)
    })

    it('rejects description exceeding 500 chars', () => {
        expect(
            schema.safeParse({ ...valid, description: 'a'.repeat(501) }).success
        ).toBe(false)
    })
})
