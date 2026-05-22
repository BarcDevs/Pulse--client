'use client'

import {
    useEffect,
    useState
} from 'react'

import { useMutation } from '@tanstack/react-query'

import {
    likePost as likePostApi,
    savePost as savePostApi
} from '@/api/forum'

import { useProfile } from '@/hooks/queries/useProfile'

type UsePostInteractionsProps = {
    postId: string
    initialLikes?: number
}

export const usePostInteractions = ({
    postId,
    initialLikes = 0
}: UsePostInteractionsProps) => {
    const { profile } = useProfile()

    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(initialLikes)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (!profile) return
        setLiked(profile.likedPostIds.includes(postId))
        setSaved(profile.savedPostIds.includes(postId))
    }, [profile, postId])

    const likeMutation = useMutation({
        mutationFn: () => likePostApi(postId),
        onSuccess: (data) => {
            setLiked(data.liked)
            setLikeCount(data.likes)
        }
    })

    const saveMutation = useMutation({
        mutationFn: () => savePostApi(postId),
        onSuccess: (data) => {
            setSaved(data.saved)
        }
    })

    return {
        liked,
        likeCount,
        saved,
        toggleLike: () => !likeMutation.isPending && likeMutation.mutate(),
        toggleSave: () => !saveMutation.isPending && saveMutation.mutate(),
        isLiking: likeMutation.isPending,
        isSaving: saveMutation.isPending
    }
}
