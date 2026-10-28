import {
    describe,
    expect,
    it
} from 'vitest'

import { createPostSchema } from '@/validations/forms/postSchema'

import { mockLocales } from './mockLocales'

const postSchema = createPostSchema(mockLocales)

const oversizedStringLength = 5_000_000
const oversizedArrayLength = 200_000
const maxParseMs = 2_000

// ==================== oversized input ====================
describe(
    'oversized constrained input (GHSA-mrhx-c7xc-m3w5)',
    () => {
        const validPost = {
            category: 'recovery',
            title: 'A valid post title here',
            body: 'This is valid body content that is long enough for testing the schema.',
            tags: ['TAG']
        }

        it(
            'should reject an oversized string promptly',
            () => {
                const start = performance.now()
                const result = postSchema.safeParse({
                    ...validPost,
                    body: 'a'.repeat(oversizedStringLength)
                })
                const elapsed = performance.now() - start

                expect(result.success).toBe(false)
                expect(elapsed).toBeLessThan(maxParseMs)
            })

        it(
            'should reject an oversized array promptly',
            () => {
                const start = performance.now()
                const result = postSchema.safeParse({
                    ...validPost,
                    tags: Array.from(
                        { length: oversizedArrayLength },
                        () => 'TAG'
                    )
                })
                const elapsed = performance.now() - start

                expect(result.success).toBe(false)
                expect(elapsed).toBeLessThan(maxParseMs)
            })
    })
