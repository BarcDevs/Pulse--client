import { PartialUser, Prettify, User } from '@/types'

export type FilterType = 'newest' | 'popular' | 'hot' | 'unanswered'

type Post_Base = {
    id: string
    body: string
    createdAt: Date
    updatedAt: Date | null
    authorId: string
    votes: Votes
    author?: PartialUser
}

export type Post = Prettify<{
    title: string
    replies: Reply[] | {id: string}[]
    views: number
    tags: Tag[] | PartialTag[]
    category: string
    _count?: {
        replies?: number
    }
} & Post_Base>

export type Reply = Prettify<Post_Base>

export type Votes = {
    upvotes: number
    downvotes: number
    upvotedBy: string[]
    downvotedBy: string[]
}

export type PartialTag = {
    id: string
    name: string
    description?: string
    createdAt?: Date
    _count?: {
        posts?: number
        followers?: number
    }
}

export type Tag = {
    id: string
    name: string
    description?: string
    posts: Post[]
    followers: User[]
    createdAt: Date
    _count?: {
        posts?: number
        followers?: number
    }
}