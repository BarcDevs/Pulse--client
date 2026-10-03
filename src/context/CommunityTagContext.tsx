'use client'

import {
    createContext,
    useContext,
    useState
} from 'react'

import { useSearchParams } from 'next/navigation'

import { ContextProps } from '@/types/react'

type CommunityTagContextType = {
    selectedTag: string | null
    setSelectedTag: (tag: string | null) => void
}

const CommunityTagContext =
    createContext<CommunityTagContextType | null>(null)

export const CommunityTagProvider = ({
    children
}: ContextProps) => {
    const searchParams = useSearchParams()
    const [selectedTag, setSelectedTag] = useState<string | null>(
        searchParams.get('tag')
    )

    const value: CommunityTagContextType = {
        selectedTag,
        setSelectedTag
    }

    return (
        <CommunityTagContext.Provider value={value}>
            {children}
        </CommunityTagContext.Provider>
    )
}

export const useCommunityTag = () => {
    const context = useContext(CommunityTagContext)
    if (!context) {
        throw new Error(
            'useCommunityTag must be used within CommunityTagProvider'
        )
    }
    return context
}
