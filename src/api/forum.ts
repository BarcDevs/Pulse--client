import type {
    PartialTag,
    Post,
    Reply
} from '@/types/community'
import type { Response } from '@/types/responses'

import { api } from '@/api/index'
import { ENDPOINTS } from '@/api/routes'
import { PostSchema } from '@/validations/forms/postSchema'

export const fetchPosts = async (
    query: any
): Promise<Post[]> => {
    const res = await api.get<Response<Post[]>>(
        ENDPOINTS.forum.posts,
        { params: query }
    )
    return res.data.data
}

export const fetchPost = async (
    postId: string
): Promise<Post> => {
    const res = await api.get<Response<Post>>(
        ENDPOINTS.forum.post(postId)
    )
    return res.data.data
}

export const createPost = async (
    post: PostSchema
): Promise<Post> => {
    const res = await api.post<Response<Post>>(
        ENDPOINTS.forum.posts,
        { ...post }
    )
    return res.data.data
}

export const updatePost = async (
    postId: string,
    post: PostSchema
): Promise<Post> => {
    const res = await api.put<Response<Post>>(
        ENDPOINTS.forum.post(postId),
        { ...post }
    )
    return res.data.data
}

export const deletePost = async (
    postId: string
): Promise<void> => {
    await api.delete(ENDPOINTS.forum.post(postId))
    return undefined
}

export const fetchReplies = async (
    postId: string
): Promise<Reply[]> => {
    const res = await api.get<Response<Reply[]>>(
        ENDPOINTS.forum.replies(postId)
    )
    return res.data.data
}

export const createReply = async (
    postId: string,
    reply: Reply
): Promise<Reply> => {
    const res = await api.post<Response<Reply>>(
        ENDPOINTS.forum.replies(postId),
        { ...reply }
    )
    return res.data.data
}

export const updateReply = async (
    postId: string,
    replyId: string,
    reply: Reply
): Promise<Reply> => {
    const res = await api.put<Response<Reply>>(
        ENDPOINTS.forum.reply(
            postId,
            replyId
        ),
        { ...reply }
    )
    return res.data.data
}

export const deleteReply = async (
    postId: string,
    replyId: string
): Promise<void> => {
    await api.delete(
        ENDPOINTS.forum.reply(
            postId,
            replyId
        )
    )
    return undefined
}

export const likePost = async (
    postId: string
): Promise<
    { liked: boolean, likes: number }
> => {
    const res = await api.post<Response<{
        liked: boolean
        likes: number
    }>>(ENDPOINTS.forum.likePost(postId))
    return res.data.data
}

export const likeReply = async (
    postId: string,
    replyId: string
): Promise<
    { liked: boolean, likes: number }
> => {
    const res = await api.post<Response<{
        liked: boolean
        likes: number
    }>>(ENDPOINTS.forum.likeReply(postId, replyId))
    return res.data.data
}

export const savePost = async (
    postId: string
): Promise<{ saved: boolean }> => {
    const res = await api.post<Response<{
        saved: boolean
    }>>(ENDPOINTS.forum.savePost(postId))
    return res.data.data
}

export const fetchSavedPosts = async (
    query?: { limit?: number, page?: number }
): Promise<Post[]> => {
    const res = await api.get<Response<Post[]>>(
        ENDPOINTS.forum.savedPosts,
        { params: query }
    )
    return res.data.data
}

export const reportUnknownTag = (
    tag: string
): void => {
    // TODO: AI tag normalization - tracks unknown tags until implemented (scaling)
    api.post(
        ENDPOINTS.forum.tagsUnknown,
        { tagName: tag }
    ).catch(() => {})
}

type FetchTagsParams = {
    filter?: 'popular'
    limit?: number
}

export const fetchTags = async (
    params?: FetchTagsParams
): Promise<PartialTag[]> => {
    const res = await api.get<Response<PartialTag[]>>(
        ENDPOINTS.forum.tags,
        { params }
    )
    return res.data.data
}

type CategoryCount = {
    category: string
    count: number
}

export const fetchPostCategoryCounts = async (
): Promise<CategoryCount[]> => {
    const res = await api.get<
        Response<CategoryCount[]>
    >(
        ENDPOINTS.forum.postCategories
    )
    return res.data.data
}
