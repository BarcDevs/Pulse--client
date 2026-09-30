import config from '@/config'

import { PostFormSchema } from '@/validations/forms/postFormSchema'

type DraftType = 'newPost' | 'newReply' | 'updatePost' | 'updateReply'

type DraftEntry = {
    type: DraftType
    postId?: string
    replyId?: string
    data: PostFormSchema
    expiresAt: number
}

export const COMMUNITY_DRAFT_PREFIX = 'community:draft:'

// Keys are per user, so a shared browser never shows one user's draft to
// another. No user means no key, and the helpers below then do nothing
type UserId = string | null | undefined

const userKey = (userId: UserId, suffix: string): string | null =>
    userId ? `${COMMUNITY_DRAFT_PREFIX}${userId}:${suffix}` : null

export const DRAFT_KEYS = {
    newPost: (userId: UserId) => userKey(userId, 'post'),
    newReply: (userId: UserId, postId: string) =>
        userKey(userId, `reply:${postId}`),
    updatePost: (userId: UserId, postId: string) =>
        userKey(userId, `updatepost:${postId}`),
    updateReply: (
        userId: UserId,
        postId: string,
        replyId: string
    ) =>
        userKey(userId, `updatereply:${postId}:${replyId}`)
}

export const saveDraft = (
    key: string | null,
    type: DraftType,
    data: PostFormSchema,
    postId?: string,
    replyId?: string
): void => {
    if (!key) return
    try {
        const entry: DraftEntry = {
            type,
            data,
            expiresAt: Date.now() + config.communityDraftTtl,
            ...(postId && { postId }),
            ...(replyId && { replyId })
        }
        localStorage.setItem(key, JSON.stringify(entry))
    } catch {
        // localStorage unavailable - silently skip
    }
}

export const getDraft = (key: string | null): DraftEntry | null => {
    if (!key) return null
    try {
        const raw = localStorage.getItem(key)
        if (!raw) return null
        const entry: DraftEntry = JSON.parse(raw)
        if (
            !entry
            || typeof entry.expiresAt !== 'number'
            || !entry.data
        ) return null
        if (Date.now() > entry.expiresAt) {
            localStorage.removeItem(key)
            return null
        }
        return entry
    } catch {
        return null
    }
}

export const clearDraft = (key: string | null): void => {
    if (!key) return
    try {
        localStorage.removeItem(key)
    } catch {
        // ignore
    }
}
