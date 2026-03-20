import { describe, expect, it } from 'vitest'

import { isPostData } from '@/lib/isPostData'

// ==================== isPostData ====================
describe(
    'isPostData',
    () => {
        const validPostData = {
            category: 'fractures',
            title: 'Test Post',
            body: 'This is a test post body',
            tags: [{
                name: 'tag1'
            }]
        }

        it(
            'should return true for valid post data',
            () => {
                expect(
                    isPostData(validPostData))
                    .toBe(true)
            })

        it(
            'should return true for valid data with empty tags array',
            () => {
                expect(
                    isPostData({
                        ...validPostData,
                        tags: []
                    })).toBe(true)
            })

        it(
            'should return true for valid data with extra properties',
            () => {
                expect(
                    isPostData({
                        ...validPostData,
                        extra: 'field'
                    })).toBe(true)
            })

        it(
            'should return falsy for null',
            () => {
                expect(
                    isPostData(null))
                    .toBeFalsy()
            })

        it(
            'should return falsy for undefined',
            () => {
                expect(
                    isPostData(undefined))
                    .toBeFalsy()
            })

        it(
            'should return false for empty object',
            () => {
                expect(
                    isPostData({}))
                    .toBe(false)
            })

        it(
            'should return false when category is missing',
            () => {
                expect(
                    isPostData({
                        title: 'Test Post',
                        body: 'This is a test post body',
                        tags: [{
                            name: 'tag1'
                        }]
                    })).toBe(false)
            })

        it(
            'should return false when title is missing',
            () => {
                expect(
                    isPostData({
                        category: 'fractures',
                        body: 'This is a test post body',
                        tags: [{
                            name: 'tag1'
                        }]
                    })).toBe(false)
            })

        it(
            'should return false when body is missing',
            () => {
                expect(
                    isPostData({
                        category: 'fractures',
                        title: 'Test Post',
                        tags: [{
                            name: 'tag1'
                        }]
                    })).toBe(false)
            })

        it(
            'should return false when tags is not an array',
            () => {
                expect(
                    isPostData({
                        ...validPostData,
                        tags: 'not-array'
                    })).toBe(false)
            })

        it(
            'should return false when category is not a string',
            () => {
                expect(
                    isPostData({
                        ...validPostData,
                        category: 123
                    })).toBe(false)
            })

        it(
            'should return false when title is not a string',
            () => {
                expect(
                    isPostData({
                        ...validPostData,
                        title: true
                    })).toBe(false)
            })

        it(
            'should return false when body is not a string',
            () => {
                expect(
                    isPostData({
                        ...validPostData,
                        body: []
                    })).toBe(false)
            })

        it(
            'should return false for primitive values',
            () => {
                expect(
                    isPostData(42))
                    .toBe(false)
                expect(
                    isPostData('string'))
                    .toBe(false)
                expect(
                    isPostData(true))
                    .toBe(false)
            })

        it(
            'should return falsy for an empty string',
            () => {
                expect(
                    isPostData(''))
                    .toBeFalsy()
            })

        it(
            'should return falsy for zero',
            () => {
                expect(
                    isPostData(0))
                    .toBeFalsy()
            })
    })
