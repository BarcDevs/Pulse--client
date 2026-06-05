import type { Post } from '@/types/community'

import { createPost, updatePost } from '@/api/forum'
import { PostSchema } from '@/validations/forms/postSchema'

export const submitForm = (
    post: PostSchema,
    postId?: string
): Promise<Post> =>
    postId
        ? updatePost(postId, post)
        : createPost(post)

