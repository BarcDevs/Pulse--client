import type { Post } from '@/types/community'
import type { User } from '@/types/user'

import { ANONYMOUS_AUTHOR } from '@/utils/community'

import { PostFormSchema } from '@/validations/forms/postFormSchema'

const getTempPostAuthor = (
    isAnonymous: boolean | undefined,
    user: User | null
): Post['author'] => {
    if (isAnonymous)
        return ANONYMOUS_AUTHOR


    if (!user) return undefined

    return {
        id: user.id,
        image: user.profile?.image ?? null,
        user: {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        }
    }
}

export const buildTempPost = (
    id: string,
    data: PostFormSchema,
    user: User | null
): Post => ({
    id,
    title: data.title ?? '',
    body: data.body,
    category: data.category ?? '',
    tags: [],
    replies: [],
    views: 0,
    shareCount: 0,
    createdAt: new Date(),
    updatedAt: null,
    authorId: user?.id ?? '',
    isAnonymous: data.isAnonymous,
    author: getTempPostAuthor(data.isAnonymous, user)
})
