'use client'

import { PostDetailContent } from '@/components/community/post-detail/PostDetailContent'

import { PostDetailProvider } from '@/context/PostDetailContext'

type PostDetailPageProps = {
    postId: string
}

export const PostDetailPage = ({
    postId
}: PostDetailPageProps) => (
    <PostDetailProvider postId={postId}>
        <PostDetailContent/>
    </PostDetailProvider>
)
