import { Prettify } from '@/types'
import {
    PartialUser,
    User
} from '@/types/user'

export type FilterType = 'newest' | 'popular' | 'unanswered'

type Post_Base = {
    id: string
    body: string
    createdAt: Date
    updatedAt: Date | null
    authorId: string
    author?: PartialUser
    _count?: {
        likes?: number
    }
}

export type Post = Prettify<{
    title: string
    replies: Reply[] | { id: string }[]
    views: number
    tags: Tag[] | PartialTag[]
    category: string
    _count?: {
        replies?: number
        likes?: number
    }
} & Post_Base>

export type Reply = Prettify<Post_Base>

export type TagLabel = {
    en: string
    he: string
}

export type PartialTag = {
    id: string
    slug: string
    label?: TagLabel
    createdAt?: Date
    _count?: {
        posts?: number
        followers?: number
    }
}

export type Tag = {
    id: string
    slug: string
    label?: TagLabel
    posts: Post[]
    followers: User[]
    createdAt: Date
    _count?: {
        posts?: number
        followers?: number
    }
}