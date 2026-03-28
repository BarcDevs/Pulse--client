import {Post} from '@/types/forum/forum'
import {ForumSearchParams} from '@/types/utils/router'

import {fetchPost, fetchPosts} from '@/api/forum'

export const postsLoader = async (search: ForumSearchParams): Promise<Post[]> =>
    (await fetchPosts(search)).data.data

export const postLoader = async (postId: string): Promise<Post> =>
    (await fetchPost(postId)).data.data
