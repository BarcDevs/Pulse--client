import {
    describe,
    expect,
    it
} from 'vitest'

import { ENDPOINTS } from '@/api/routes'

const traversalId = '../../check-in?'
const encodedTraversalId = '..%2F..%2Fcheck-in%3F'

describe('ENDPOINTS path builders', () => {
    it('keeps plain ids unchanged', () => {
        expect(ENDPOINTS.forum.post('post-1'))
            .toBe('/forum/posts/post-1')
        expect(ENDPOINTS.recoveryGoals.goal('goal-1'))
            .toBe('/recovery-goals/goal-1')
    })

    it('encodes a traversal attempt in every forum builder', () => {
        const base = `/forum/posts/${encodedTraversalId}`

        expect(ENDPOINTS.forum.post(traversalId)).toBe(base)
        expect(ENDPOINTS.forum.likePost(traversalId))
            .toBe(`${base}/like`)
        expect(ENDPOINTS.forum.savePost(traversalId))
            .toBe(`${base}/save`)
        expect(ENDPOINTS.forum.sharePost(traversalId))
            .toBe(`${base}/share`)
        expect(ENDPOINTS.forum.replies(traversalId))
            .toBe(`${base}/replies`)
        expect(ENDPOINTS.forum.reply('post-1', traversalId))
            .toBe(`/forum/posts/post-1/replies/${encodedTraversalId}`)
        expect(ENDPOINTS.forum.likeReply('post-1', traversalId))
            .toBe(`/forum/posts/post-1/replies/${encodedTraversalId}/like`)
    })

    it('encodes a traversal attempt in every goal builder', () => {
        const base = `/recovery-goals/${encodedTraversalId}`

        expect(ENDPOINTS.recoveryGoals.goal(traversalId)).toBe(base)
        expect(ENDPOINTS.recoveryGoals.milestones(traversalId))
            .toBe(`${base}/milestones`)
        expect(ENDPOINTS.recoveryGoals.milestone('goal-1', traversalId))
            .toBe(`/recovery-goals/goal-1/milestones/${encodedTraversalId}`)
        expect(
            ENDPOINTS.recoveryGoals.completeMilestone('goal-1', traversalId)
        ).toBe(`/recovery-goals/goal-1/milestones/${encodedTraversalId}/complete`)
    })

    it('encodes a traversal attempt in the check-in builder', () => {
        expect(ENDPOINTS.checkIn.item('checkin-1'))
            .toBe('/check-in/checkin-1')
        expect(ENDPOINTS.checkIn.item(traversalId))
            .toBe(`/check-in/${encodedTraversalId}`)
        expect(() => ENDPOINTS.checkIn.item('..')).toThrow()
    })

    it('keeps an encoded id inside a single path segment', () => {
        const url = ENDPOINTS.forum.reply(traversalId, traversalId)

        expect(url.split('/')).toHaveLength(6)
        expect(url).not.toContain('?')
    })

    it('rejects a bare dot segment that the browser would resolve', () => {
        ;['.', '..'].forEach((id) => {
            expect(() => ENDPOINTS.forum.post(id)).toThrow()
            expect(() => ENDPOINTS.forum.likePost(id)).toThrow()
            expect(() => ENDPOINTS.forum.reply('post-1', id)).toThrow()
            expect(() => ENDPOINTS.recoveryGoals.goal(id)).toThrow()
            expect(() => ENDPOINTS.recoveryGoals.milestone('goal-1', id)).toThrow()
        })
    })
})
