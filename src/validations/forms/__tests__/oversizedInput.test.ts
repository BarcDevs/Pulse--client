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

// ==================== oversized input ====================
describe(
    'oversized constrained input is rejected',
    () => {
        const validPost = {
            category: 'recovery',
            title: 'A valid post title here',
            body: 'This is valid body content that is long enough for testing the schema.',
            tags: ['TAG']
        }

        it(
            'should reject an oversized string',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    body: 'a'.repeat(oversizedStringLength)
                })

                expect(result.success).toBe(false)
            })

        it(
            'should reject an oversized array',
            () => {
                const result = postSchema.safeParse({
                    ...validPost,
                    tags: Array.from(
                        { length: oversizedArrayLength },
                        () => 'TAG'
                    )
                })

                expect(result.success).toBe(false)
            })
    })
