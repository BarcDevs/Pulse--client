import { describe, expect, it } from 'vitest'

import type { User } from '@/types/user'

import { buildTempPost } from '@/lib/community/buildTempPost'

import { ANONYMOUS_AUTHOR } from '@/utils/community'

import { PostFormSchema } from '@/validations/forms/postFormSchema'

const user = {
    id: 'user-1',
    firstName: 'Dana',
    lastName: 'Levi',
    username: 'dana',
    profile: { image: 'dana.png' }
} as User

const data = {
    title: 'Hello',
    body: '<p>Body</p>',
    category: 'general',
    tags: [],
    isAnonymous: false
} as PostFormSchema

describe('buildTempPost', () => {
    it('uses the given id and the form fields', () => {
        const post = buildTempPost('temp-post-1', data, user)

        expect(post.id).toBe('temp-post-1')
        expect(post.title).toBe('Hello')
        expect(post.body).toBe('<p>Body</p>')
        expect(post.category).toBe('general')
        expect(post.authorId).toBe('user-1')
    })

    it('shows the real author when the post is not anonymous', () => {
        const post = buildTempPost('temp-post-1', data, user)

        expect(post.author).toEqual({
            id: 'user-1',
            image: 'dana.png',
            user: {
                id: 'user-1',
                username: 'dana',
                firstName: 'Dana',
                lastName: 'Levi'
            }
        })
    })

    it('shows the anonymous alias and never the real name when anonymous', () => {
        const post = buildTempPost(
            'temp-post-1',
            { ...data, isAnonymous: true },
            user
        )

        expect(post.author).toBe(ANONYMOUS_AUTHOR)
        expect(post.isAnonymous).toBe(true)
    })

    it('has no author and an empty authorId without a user', () => {
        const post = buildTempPost('temp-post-1', data, null)

        expect(post.author).toBeUndefined()
        expect(post.authorId).toBe('')
    })
})
