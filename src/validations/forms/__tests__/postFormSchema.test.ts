import {
    describe,
    expect,
    it
} from 'vitest'

import { createPostFormSchema } from '@/validations/forms/postFormSchema'

import { mockLocales } from './mockLocales'

describe('createPostFormSchema — post mode', () => {
    const schema = createPostFormSchema(mockLocales)

    const validPost = {
        title: 'Valid post title here',
        category: 'recovery',
        body: 'This is a valid body content that is long enough.',
        tags: ['TAG']
    }

    it('accepts valid post', () => {
        expect(schema.safeParse(validPost).success).toBe(true)
    })

    it('rejects empty title', () => {
        expect(schema.safeParse({ ...validPost, title: '' }).success).toBe(false)
    })

    it('rejects title shorter than 5 chars', () => {
        expect(schema.safeParse({ ...validPost, title: 'Hi' }).success).toBe(false)
    })

    it('rejects title longer than 100 chars', () => {
        expect(schema.safeParse({ ...validPost, title: 'A'.repeat(101) }).success).toBe(false)
    })

    it('accepts title at exact boundaries', () => {
        expect(schema.safeParse({ ...validPost, title: 'A'.repeat(5) }).success).toBe(true)
        expect(schema.safeParse({ ...validPost, title: 'A'.repeat(100) }).success).toBe(true)
    })

    it('rejects empty category', () => {
        expect(schema.safeParse({ ...validPost, category: '' }).success).toBe(false)
    })

    it('rejects invalid category key', () => {
        const result = schema.safeParse({ ...validPost, category: 'invalid-key' })
        expect(result.success).toBe(false)
        if (!result.success)
            expect(result.error.issues.some(i => i.message === 'Category is invalid')).toBe(true)
    })

    it('rejects empty body', () => {
        expect(schema.safeParse({ ...validPost, body: '' }).success).toBe(false)
    })

    it('rejects HTML-only body (strips to empty)', () => {
        expect(schema.safeParse({ ...validPost, body: '<p>&nbsp;</p>' }).success).toBe(false)
    })

    it('rejects body shorter than 20 chars after stripping HTML', () => {
        expect(schema.safeParse({ ...validPost, body: '<p>Short</p>' }).success).toBe(false)
    })

    it('rejects body longer than 300 chars', () => {
        expect(schema.safeParse({ ...validPost, body: 'A'.repeat(301) }).success).toBe(false)
    })

    it('accepts body with HTML that strips to valid length', () => {
        expect(schema.safeParse({
            ...validPost,
            body: '<p>This is a valid body content that is long enough.</p>'
        }).success).toBe(true)
    })

    it('rejects empty tags array', () => {
        expect(schema.safeParse({ ...validPost, tags: [] }).success).toBe(false)
    })

    it('rejects more than 5 tags', () => {
        expect(schema.safeParse({ ...validPost, tags: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'] }).success).toBe(false)
    })

    it('rejects tag shorter than 2 chars', () => {
        expect(schema.safeParse({ ...validPost, tags: ['A'] }).success).toBe(false)
    })

    it('rejects tag longer than 20 chars', () => {
        expect(schema.safeParse({ ...validPost, tags: ['A'.repeat(21)] }).success).toBe(false)
    })
})

describe('createPostFormSchema — reply mode', () => {
    const schema = createPostFormSchema(mockLocales, { isReply: true })

    const validReply = {
        body: 'This is a valid reply body.'
    }

    it('accepts reply with body only', () => {
        expect(schema.safeParse(validReply).success).toBe(true)
    })

    it('title is optional in reply mode', () => {
        expect(schema.safeParse({ body: validReply.body, title: undefined }).success).toBe(true)
    })

    it('category is optional in reply mode', () => {
        expect(schema.safeParse({ body: validReply.body, category: undefined }).success).toBe(true)
    })

    it('tags are optional in reply mode', () => {
        expect(schema.safeParse({ body: validReply.body, tags: undefined }).success).toBe(true)
    })

    it('rejects empty body in reply mode', () => {
        expect(schema.safeParse({ body: '' }).success).toBe(false)
    })

    it('accepts short body in reply mode (no minLength enforced)', () => {
        expect(schema.safeParse({ body: 'Hi there!' }).success).toBe(true)
    })

    it('rejects body longer than 300 chars in reply mode', () => {
        expect(schema.safeParse({ body: 'A'.repeat(301) }).success).toBe(false)
    })

    it('does not validate category against allowed list in reply mode', () => {
        expect(schema.safeParse({ body: validReply.body, category: 'invalid-key' }).success).toBe(true)
    })
})
