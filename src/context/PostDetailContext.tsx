'use client'

import {
    createContext,
    ReactNode,
    useContext,
    useState
} from 'react'

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
    children: ReactNode
    postId: string
}

export const PostDetailProvider = ({
    children,
    postId
}: PostDetailProviderProps) => {
    const [
        isReplyFormOpen, setIsReplyFormOpen
    ] = useState(false)
    const [
        isEditingPost, setIsEditingPost
    ] = useState(false)

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
