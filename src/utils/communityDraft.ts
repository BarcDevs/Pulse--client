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

export const DRAFT_KEYS = {
    newPost: 'community:draft:post',
    newReply: (postId: string) => `community:draft:reply:${postId}`,
    updatePost: (postId: string) => `community:draft:updatepost:${postId}`,
    updateReply: (postId: string, replyId: string) =>
        `community:draft:updatereply:${postId}:${replyId}`
}

export const saveDraft = (
    key: string,
    type: DraftType,
    data: PostFormSchema,
    postId?: string,
    replyId?: string
): void => {
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

export const getDraft = (key: string): DraftEntry | null => {
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

export const clearDraft = (key: string): void => {
    try {
        localStorage.removeItem(key)
    } catch {
        // ignore
    }
}
