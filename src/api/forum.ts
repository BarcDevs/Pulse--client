import type {
    PartialTag,
    Post,
    Reply
} from '@/types/community'
import type { Response } from '@/types/responses'

import { api } from '@/api/index'
import { PostSchema } from '@/validations/forms/postSchema'

export const fetchPosts = async (
    query: any
): Promise<Post[]> => {
    const res = await api.get<Response<Post[]>>('/forum/posts', {
        params: query
    })
    return res.data.data
}

export const fetchPost = async (
    postId: string
): Promise<Post> => {
    const res = await api.get<Response<Post>>(`/forum/posts/${postId}`)
    return res.data.data
}

export const createPost = async (
    post: PostSchema
): Promise<Post> => {
    const res = await api.post<Response<Post>>('/forum/posts', {
        ...post
    })
    return res.data.data
}

export const updatePost = async (
    postId: string,
    post: PostSchema
): Promise<Post> => {
    const res = await api.put<Response<Post>>(`/forum/posts/${postId}`, {
        ...post
    })
    return res.data.data
}

export const deletePost = async (
    postId: string
): Promise<void> => {
    await api.delete(`/forum/posts/${postId}`)
    return undefined
}

export const fetchReplies = async (
    postId: string
): Promise<{ replies: Reply[] }> => {
    const res = await api.get<Response<{ replies: Reply[] }>>(`/forum/posts/${postId}/replies`)
    return res.data.data
}

export const createReply = async (
    postId: string,
    reply: Reply
): Promise<{ reply: Reply }> => {
    const res = await api.post<Response<{ reply: Reply }>>(`/forum/posts/${postId}/replies`, {
        ...reply
    })
    return res.data.data
}

export const updateReply = async (
    postId: string,
    replyId: string,
    reply: Reply
): Promise<{ reply: Reply }> => {
    const res = await api.put<Response<{ reply: Reply }>>(
        `/forum/posts/${postId}/replies/${replyId}`,
        { ...reply }
    )
    return res.data.data
}

export const deleteReply = async (
    postId: string,
    replyId: string
): Promise<void> => {
    await api.delete(
        `/forum/posts/${postId}/replies/${replyId}`
    )
    return undefined
}

export const fetchTags = async ():
    Promise<PartialTag[]> => {
    const res = await api.get<Response<PartialTag[]>>('/forum/tags')
    return res.data.data
}
