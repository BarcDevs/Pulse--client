import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi
} from 'vitest'

vi.mock('@/config', () => ({
    default: { communityDraftTtl: 5 * 60 * 1000 }
}))

import {
    clearDraft,
    DRAFT_KEYS,
    getDraft,
    saveDraft
} from '@/utils/communityDraft'

import type { PostFormSchema } from '@/validations/forms/postFormSchema'

const TTL_MS = 5 * 60 * 1000
const USER = 'user-1'

const replyData: PostFormSchema = { body: 'Test reply body' }
const postData: PostFormSchema = {
    body: 'Test post body',
    title: 'My Post',
    category: 'recovery',
    tags: ['pain']
}

describe('communityDraft', () => {
    beforeEach(() => {
        localStorage.clear()
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    describe('saveDraft + getDraft', () => {
        it('returns saved data within TTL', () => {
            saveDraft(DRAFT_KEYS.newPost(USER), 'newPost', postData)
            const draft = getDraft(DRAFT_KEYS.newPost(USER))

            expect(draft?.data).toEqual(postData)
            expect(draft?.type).toBe('newPost')
        })

        it('returns null after TTL expires', () => {
            saveDraft(DRAFT_KEYS.newPost(USER), 'newPost', postData)
            vi.advanceTimersByTime(TTL_MS + 1)

            expect(getDraft(DRAFT_KEYS.newPost(USER))).toBeNull()
        })

        it('removes expired entry from localStorage on read', () => {
            saveDraft(DRAFT_KEYS.newPost(USER), 'newPost', postData)
            vi.advanceTimersByTime(TTL_MS + 1)
            getDraft(DRAFT_KEYS.newPost(USER))

            expect(localStorage.getItem(DRAFT_KEYS.newPost(USER)!)).toBeNull()
        })

        it('returns null for key that was never written', () => {
            expect(getDraft('community:draft:nonexistent')).toBeNull()
        })

        it('stores postId when provided', () => {
            saveDraft(
                DRAFT_KEYS.newReply(USER, 'post-1'),
                'newReply',
                replyData,
                'post-1'
            )

            const draft = getDraft(DRAFT_KEYS.newReply(USER, 'post-1'))

            expect(draft?.postId).toBe('post-1')
        })

        it('stores replyId when provided', () => {
            saveDraft(
                DRAFT_KEYS.updateReply(USER, 'post-1', 'reply-42'),
                'updateReply',
                replyData,
                'post-1',
                'reply-42'
            )

            const draft = getDraft(DRAFT_KEYS.updateReply(USER, 'post-1', 'reply-42'))

            expect(draft?.replyId).toBe('reply-42')
        })
    })

    describe('clearDraft', () => {
        it('removes draft so subsequent read returns null', () => {
            saveDraft(DRAFT_KEYS.newPost(USER), 'newPost', postData)
            clearDraft(DRAFT_KEYS.newPost(USER))

            expect(getDraft(DRAFT_KEYS.newPost(USER))).toBeNull()
        })

        it('does not throw when key does not exist', () => {
            expect(() => clearDraft('community:draft:ghost')).not.toThrow()
        })
    })

    describe('DRAFT_KEYS', () => {
        it('generates different keys for different postIds in newReply', () => {
            expect(DRAFT_KEYS.newReply(USER, 'post-1')).not.toBe(
                DRAFT_KEYS.newReply(USER, 'post-2')
            )
        })

        it('generates different keys for different replyIds in updateReply', () => {
            expect(DRAFT_KEYS.updateReply(USER, 'post-1', 'reply-1')).not.toBe(
                DRAFT_KEYS.updateReply(USER, 'post-1', 'reply-2')
            )
        })

        it('generates different keys for different users', () => {
            expect(DRAFT_KEYS.newPost('user-1')).not.toBe(
                DRAFT_KEYS.newPost('user-2')
            )
        })

        it('gives no key without a user, so drafts are neither read nor saved', () => {
            expect(DRAFT_KEYS.newPost(null)).toBeNull()
            saveDraft(DRAFT_KEYS.newPost(undefined), 'newPost', postData)
            expect(localStorage.length).toBe(0)
            expect(getDraft(DRAFT_KEYS.newPost(null))).toBeNull()
        })

        it("does not return another user's draft", () => {
            saveDraft(DRAFT_KEYS.newPost('user-1'), 'newPost', postData)
            expect(getDraft(DRAFT_KEYS.newPost('user-2'))).toBeNull()
        })

        it('generates different keys for same postId across different draft types', () => {
            expect(DRAFT_KEYS.newReply(USER, 'post-1')).not.toBe(
                DRAFT_KEYS.updatePost(USER, 'post-1')
            )
        })
    })
})
