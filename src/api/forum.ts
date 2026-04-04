import { Post, Reply } from '@/types/forum/forum'
import { ApiResponse, Response } from '@/types/responses'

import { api } from '@/api/index'
import { PostSchema } from '@/validations/forms/postSchema'

export const fetchPosts = async (query: any) =>
    await api.get<Response<Post[]>>(
        '/forum/posts', {
            params: query
        })

export const fetchPost = async (postId: string) =>
    api.get<Response<Post>>(
        `/forum/posts/${postId}`
    )

export const createPost = async (post: PostSchema) =>
    api.post<Response<Post>>('/forum/posts', {
        ...post
    })

export const updatePost = async (
    postId: string,
    post: PostSchema
) =>
    api.put<Response<Post>>(
        `/forum/posts/${postId}`, {
            ...post
        })

export const deletePost = async (
    postId: string
): ApiResponse<object> =>
    api.delete<Response<object>>(
        `/forum/posts/${postId}`
    )

export const fetchReplies = async (postId: string) =>
    api.get<Response<{replies: Reply[]}>>(
        `/forum/posts/${postId}/replies`
    )

export const createReply = async (
    postId: string,
    reply: Reply
) =>
    api.post<Response<{reply: Reply}>>(
        `/forum/posts/${postId}/replies`, {
            ...reply
        })

export const updateReply = async (
    postId: string,
    replyId: string,
    reply: Reply
) =>
    api.put<Response<{reply: Reply}>>(
        `/forum/posts/${postId}/replies/${replyId}`, {
            ...reply
        })

