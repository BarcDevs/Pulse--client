import { describe, expect, it } from 'vitest'

import { postSchema } from '@/validations/forms/postSchema'

// ==================== postSchema ====================
describe(
    'postSchema',
    () => {
        const validPost = {
            category: 'fractures',
            title: 'A valid post title here',
            body: 'This is valid body content that is ' +
                'long enough for testing the schema.',
            tags: ['TAG']
        }

        it(
            'should validate valid post data',
            () => {
                const result = postSchema.safeParse(validPost)
                expect(result.success).toBe(true)
            })

        it(
            'should uppercase tags automatically',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    tags: ['lowercase']
                })
                expect(result.success).toBe(true)
                if ( result.success ) {
                    expect(result.data.tags[ 0 ]).toBe('LOWERCASE')
                }
            })

        it(
            'should accept all valid category keys',
            () => {
                const validKeys = [
                    'fractures',
                    'spinals',
                    'brain',
                    'musculoskeletal',
                    'physical',
                    'occupational',
                    'coping',
                    'emotional',
                    'introduction',
                    'success',
                    'discussion'
                ]
                validKeys.forEach(key => {
                    const result = postSchema.safeParse({
                        ...validPost,
                        category: key
                    })
                    expect(result.success).toBe(true)
                })
            })

        it(
            'should reject empty category',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    category: ''
                })
                expect(result.success).toBe(false)
            })

        it(
            'should reject invalid category key',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    category: 'nonexistent'
                })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    const categoryIssue =
                        result.error.issues.find(
                            i => i.message ===
                                'Category is invalid'
                        )
                    expect(categoryIssue).toBeDefined()
                }
            })

        it(
            'should reject empty title',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    title: ''
                })
                expect(result.success).toBe(false)
            })

        it(
            'should reject title shorter than 5 characters',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    title: 'Hi'
                })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    const titleIssue =
                        result.error.issues.find(
                            i => i.message ===
                                'Title is too short'
                        )
                    expect(titleIssue).toBeDefined()
                }
            })

        it(
            'should reject title longer than 100 characters',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    title: 'A'.repeat(101)
                })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    const titleIssue =
                        result.error.issues.find(
                            i => i.message ===
                                'Title is too long'
                        )
                    expect(titleIssue).toBeDefined()
                }
            })

        it(
            'should accept title at exact boundary lengths',
            () => {
                const minResult = postSchema.safeParse({
                    ...validPost,
                    title: 'A'.repeat(5)
                })
                expect(minResult.success).toBe(true)

                const maxResult = postSchema.safeParse({
                    ...validPost,
                    title: 'A'.repeat(100)
                })
                expect(maxResult.success).toBe(true)
            })

        it(
            'should reject empty body',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    body: ''
                })
                expect(result.success).toBe(false)
            })

        it(
            'should reject body shorter than 20 characters',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    body: 'Short body'
                })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    const bodyIssue =
                        result.error.issues.find(
                            i => i.message ===
                                'Content is too short'
                        )
                    expect(bodyIssue).toBeDefined()
                }
            })

        it(
            'should reject body longer than 300 characters',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    body: 'A'.repeat(301)
                })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    const bodyIssue =
                        result.error.issues.find(
                            i => i.message.includes(
                                'Content must be less than'
                            )
                        )
                    expect(bodyIssue).toBeDefined()
                }
            })

        it(
            'should reject empty tags array',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    tags: []
                })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    expect(result.error.issues[ 0 ].message)
                        .toBe('At least one tag is required')
                }
            })

        it(
            'should reject more than 3 tags',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    tags: ['TAG1', 'TAG2', 'TAG3', 'TAG4']
                })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    const tagIssue =
                        result.error.issues.find(
                            i => i.message.includes(
                                'Cannot have more than'
                            )
                        )
                    expect(tagIssue).toBeDefined()
                }
            })

        it(
            'should accept exactly 3 tags',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    tags: ['TAG1', 'TAG2', 'TAG3']
                })
                expect(result.success).toBe(true)
            })

        it(
            'should reject tags shorter than 3 characters',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    tags: ['AB']
                })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    const tagIssue =
                        result.error.issues.find(
                            i => i.message === 'Tag is too short'
                        )
                    expect(tagIssue).toBeDefined()
                }
            })

        it(
            'should reject tags longer than 15 characters',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    tags: ['A'.repeat(16)]
                })
                expect(result.success).toBe(false)
                if ( !result.success ) {
                    const tagIssue =
                        result.error.issues.find(
                            i => i.message === 'Tag is too long'
                        )
                    expect(tagIssue).toBeDefined()
                }
            })

        it(
            'should accept tags at boundary lengths',
            () => {
                const minResult = postSchema.safeParse({
                    ...validPost,
                    tags: ['ABC']
                })
                expect(minResult.success).toBe(true)

                const maxResult = postSchema.safeParse({
                    ...validPost,
                    tags: ['A'.repeat(15)]
                })
                expect(maxResult.success).toBe(true)
            })
    })
