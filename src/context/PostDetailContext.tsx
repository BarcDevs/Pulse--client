'use client'

import {
    createContext,
    useContext,
    useState
} from 'react'

import { ContextProps } from '@/types/react'

import {
    DRAFT_KEYS,
    getDraft
} from '@/utils/communityDraft'

import { useAuth } from '@/context/AuthContext'

type PostDetailContextType = {
    postId: string
    isReplyFormOpen: boolean
    setIsReplyFormOpen: (open: boolean) => void
    isEditingPost: boolean
    setIsEditingPost: (editing: boolean) => void
}

const PostDetailContext = createContext<
    PostDetailContextType | undefined
>(undefined)

type PostDetailProviderProps = {
    postId: string
} & ContextProps

export const PostDetailProvider = ({
    children,
    postId
}: PostDetailProviderProps) => {
    const { user } = useAuth()
    const [
        isReplyFormOpen, setIsReplyFormOpen
    ] = useState(() => {
        const draft = getDraft(
            DRAFT_KEYS.newReply(postId)
        )
        return !!(draft && user)
    })
    const [
        isEditingPost, setIsEditingPost
    ] = useState(() => {
        const draft = getDraft(
            DRAFT_KEYS.updatePost(postId)
        )
        return !!draft
    })

    const value: PostDetailContextType = {
        postId,
        isReplyFormOpen,
        setIsReplyFormOpen,
        isEditingPost,
        setIsEditingPost
    }

    return (
        <PostDetailContext.Provider value={value}>
            {children}
        </PostDetailContext.Provider>
    )
}

export const usePostDetail = () => {
    const context = useContext(PostDetailContext)
    if (!context) {
        throw new Error(
            'usePostDetail must be used within PostDetailProvider'
        )
    }
    return context
}
