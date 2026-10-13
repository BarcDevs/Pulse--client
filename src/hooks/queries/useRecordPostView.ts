import { useEffect, useRef } from 'react'

import { recordPostView } from '@/api/forum'

export const useRecordPostView = (
    postId?: string
) => {
    const recordedPostId = useRef<string>(undefined)

    useEffect(() => {
        if (!postId || recordedPostId.current === postId) return

        recordedPostId.current = postId
        recordPostView(postId).catch(() => undefined)
    }, [postId])
}
