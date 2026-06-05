'use client'

import { PostDetailContent } from '@/components/community/postDetail/PostDetailContent'

import { ForumRepliesProvider } from '@/context/ForumRepliesContext'
import { PostDetailProvider } from '@/context/PostDetailContext'

type PostDetailPageProps = {
    postId: string
}

export const PostDetailPage = ({
    postId
}: PostDetailPageProps) => (
    <PostDetailProvider postId={postId}>
        <ForumRepliesProvider postId={postId}>
            <PostDetailContent/>
        </ForumRepliesProvider>
    </PostDetailProvider>
)
