'use client'

import { use } from 'react'

import { PostDetailPage }
    from '@/components/community/postDetail/PostDetailPage'

type PostDetailPageProps = {
    params: Promise<{
        id: string
    }>
}

const PostDetail = ({
    params
}: PostDetailPageProps) => {
    const { id } = use(params)

    return (
        <div className={'space-y-6'}>
            <PostDetailPage postId={id}/>
        </div>
    )
}

export default PostDetail
